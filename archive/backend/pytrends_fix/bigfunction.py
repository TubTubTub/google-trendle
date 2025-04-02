import random
import json
import urllib.parse
from curl_cffi import requests
import time
import datetime
from selenium import webdriver

def build_payload(keywords, timeframe, geo, category, property):
    token_payload = {
        'hl': 'en-US',
        'tz': '0',
        'req': {
            'comparisonItem': [{'keyword': keyword, 'time': timeframe, 'geo': geo} for keyword in keywords],
            'category': category,
            'property': property,
        }
    }
    token_payload['req'] = json.dumps(token_payload['req'])
    return token_payload


def get_google_cookies(browser):
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=options)
    driver.get("https://trends.google.com/")
    time.sleep(5)
    cookies = driver.get_cookies()
    cookie = driver.get_cookie("NID")["value"]

    print(cookie)
    print(driver.get_cookies())
    driver.quit()


    nid_cookie = f"NID={cookie}"

    return cookies

    with requests.Session() as session:
        session.post("https://trends.google.com/trends/explore", impersonate=browser)
        print(session.cookies)
        return session.cookies


def get_widgets(keywords, timeframe, geo, category, property, session, browser, cookies):
    time.sleep(2)
    token_payload = build_payload(keywords, timeframe, geo, category, property)
    url = 'https://trends.google.com/trends/api/explore'
    params = urllib.parse.urlencode(token_payload)
    full_url = f"{url}?{params}"
    response = session.get(full_url, impersonate=browser, cookies=cookies)
    if response.status_code == 200:
        content = response.text[4:]
        try:
            data = json.loads(content)
            widgets = {widget['id']: widget for widget in data['widgets']}
            return widgets
        except json.JSONDecodeError:
            print(f"Failed to decode JSON while fetching token, retrying")
    else:
        print(f"Error {response.status_code} while fetching token, retrying")


def get_trends(widgets, session, browser, cookies):
    time.sleep(5)
    token = widgets['TIMESERIES']['token']
    req_string = json.dumps(widgets['TIMESERIES']['request'], separators=(',', ':'))
    encoded_req = urllib.parse.quote(req_string, safe=':,+')
    url = f"https://trends.google.com/trends/api/widgetdata/multiline?hl=en-US&tz=0&req={encoded_req}&token={token}"
    response = session.get(url, impersonate=browser, cookies=cookies)
    if response.status_code == 200:
        content = response.text[5:]
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            print(f"Failed to decode JSON while fetching trends data, retrying")
    else:
        print(f"Error {response.status_code} while fetching trends data, retrying")


def format_trends(raw_data, keywords):
    data = []
    for entry in raw_data['default']['timelineData']:
        timestamp = int(entry['time'])
        timestamp = datetime.datetime.utcfromtimestamp(timestamp).isoformat()
        for keyword, value in zip(keywords, entry['value']):
            data.append({
                'timestamp': timestamp,
                'keyword': keyword,
                'value': value,
            })
    return data


def fetch_trends_data(keywords, timeframe='now 7-d', geo='US', category=0, property='', max_retries_per_browser=5):
    browsers = ['chrome99', 'chrome100', 'chrome101', 'chrome104', 'chrome107', 'chrome110', 'chrome116', 'chrome119', 'chrome120', 'chrome123', 'chrome124', 'chrome99_android', 'edge99', 'edge101', 'safari15_3', 'safari15_5', 'safari17_0', 'safari17_2_ios']
    random.shuffle(browsers)
    browsers = browsers[:5]
    for browser in browsers:
        print(f"Starting with browser version to {browser}")
        cookies = get_google_cookies(browser)

        with requests.Session() as session:
            # phase 1: token
            for retry in range(max_retries_per_browser):
                print(f'Get Widgets {retry + 1}/{max_retries_per_browser}')
                widgets = get_widgets(keywords, timeframe, geo, category, property, session, browser, cookies)
                if widgets:
                    break
            else:
                print(f"Exceeded maximum retry attempts ({max_retries_per_browser}) while fetching token.")
                time.sleep(5)
                continue

            # phase 2: trends data
            for retry in range(max_retries_per_browser):
                print(f'Get Trends {retry + 1}/{max_retries_per_browser}')
                raw_data = get_trends(widgets, session, browser, cookies)
                if raw_data:
                    trends_data = format_trends(raw_data, keywords)
                    return trends_data
            else:
                print(f"Exceeded maximum retry attempts ({max_retries_per_browser}) while fetching trends data.")
                time.sleep(5)

    print(f"FAILED with all browsers. Exiting...")
    return []
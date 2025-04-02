from dotenv import load_dotenv
from PIL import Image
import urllib.request
import pandas as pd
import numpy as np
import datetime
import requests
import os

load_dotenv()

class Trend:

    def __init__(self, keyword, timeframe, data_url):
        self._keyword = keyword
        self._timeframe = timeframe
        self._data_url = data_url

        self._api_df = None
        self._user_df = None
        self._raw_data = None

        self._api_row_count = None
        self._user_row_count = None
        self._user_col_count = None

        self.get_api_data()
        self.parse_api_df()
        self.parse_data_url()

    def get_api_data(self):
        print(f'BUILDING REQUEST: {self._keyword} | {self._timeframe}')

        days_unit = 30 if self._timeframe[-1] == 'm' else 365
        number_of_units = int(''.join([char for char in self._timeframe if char.isdigit()]))
        self._timeframe = datetime.datetime.now() - datetime.timedelta(days=number_of_units * days_unit)
        self._timeframe = f'{self._timeframe.strftime('%Y-%m-%d')} {datetime.datetime.now().strftime('%Y-%m-%d')}'
        self._timeframe = self._timeframe.replace(' ', '%20')

        try:
            data = requests.get(f'https://serpapi.com/search.json?tz=0&date={self._timeframe}&engine=google_trends&q={self._keyword}&data_type=TIMESERIES&api_key={os.getenv('SERP_API_KEY')}')
            data.raise_for_status()
            data = data.json()['interest_over_time']['timeline_data']

            scores = []
            raw_data = []
            for date_items in data:
                for scraped_values in date_items['values']:
                    score = int(scraped_values['value'])
                    raw_data.append({'key': date_items['date'], 'value': score})
                    scores.append(score)

            self._api_df = pd.DataFrame(scores, columns=[self._keyword])
            self._raw_data = raw_data
        except Exception as error:
            match data.status_code:
                case 400:
                    raise Exception('400 Bad request.')
                case 401:
                    raise Exception('401 Invalid API key.')
                case 402:
                    raise Exception('429 Too many requests, please come back later!')
                case _:
                    raise error

    def parse_api_df(self):
        self._api_df[self._keyword] = self._api_df[self._keyword] / 100
        self._api_df = self._api_df.reset_index()

        self._api_df['user_values'] = np.nan
        self._api_row_count = len(self._api_df)

    def parse_data_url(self):
        image_data = urllib.request.urlopen(self._data_url)
        image = Image.open(image_data).convert('L')
        data = np.array(image)

        self._user_df = pd.DataFrame(data)
        self._user_row_count = len(self._user_df)
        self._user_col_count = len(self._user_df.columns)

    def calculate_score(self):
        relevant = self._user_df[self._user_df.columns[self._user_df.mean(axis=0) > 0]]

        for column_idx in relevant:
            line_values = self._user_df[column_idx][self._user_df[column_idx] != 0]

            if len(line_values) > 0:
                corresponding_row = int(column_idx / self._user_col_count * self._api_row_count)
                mean = (self._user_row_count - line_values.index.values.mean()) / self._user_row_count
                self._api_df.at[corresponding_row, 'user_values'] = mean

        self._api_df['difference'] = np.square((self._api_df['user_values'] - self._api_df[self._keyword]))
        self._api_df['difference'] = self._api_df['difference'].fillna(value=1, axis=0)

        mean_squared_error = (self._api_df['difference'].sum()) / self._api_row_count
        return float((1 - mean_squared_error) * 100)

    def get_raw_data(self):
        return self._raw_data

    def visualise_result(self):
        self._api_df['user_values'].plot()

    def visualise_api(self):
        self._api_df[self._keyword].plot()
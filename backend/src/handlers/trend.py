from pytrends.request import TrendReq
import urllib.request
from PIL import Image
import pandas as pd
import numpy as np

pytrends = TrendReq(hl='en-GB', tz=0, requests_args={
    'headers': {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8080',
        'Pragma': 'no-cache',
        'Referer': 'http://localhost:8080/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        # 'Cookie': 'g_state={"i_l":0,"i_t":1736084658226}',
    }
})

class Trend:
    def __init__(self, keyword, timeframe, data_url):
        self._keyword = keyword
        self._timeframe = timeframe
        self._data_url = data_url

        self._api_df = None
        self._user_df = None

        self._api_row_count = None
        self._user_row_count = None
        self._user_col_count = None

        self.get_api_data()
        self.parse_api_df()
        self.parse_data_url()

    def get_api_data(self):
        print('Aaaa')
        print(self._keyword)
        print(self._timeframe)
        print(f'BUILDING REQUEST: {self._keyword} | {self._timeframe}')
        pytrends.build_payload(kw_list=[self._keyword], timeframe=[self._timeframe])
        self._api_df = pytrends.interest_over_time() # Changed to requests.post https://stackoverflow.com/questions/75744524/pytends-api-throwing-429-error-even-if-the-request-was-made-very-first-time

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

        # self._api_df['user_values'] = self._api_df['user_values'].interpolate(method='linear', axis=0)

        # if self._api_df['user_values'].isnull().values.any():
        #     self._api_df['user_values'] = self._api_df['user_values'].bfill(axis=0)
        #     self._api_df['user_values'] = self._api_df['user_values'].ffill(axis=0)

        self._api_df['difference'] = np.square((self._api_df['user_values'] - self._api_df[self._keyword]))
        self._api_df['difference'] = self._api_df['difference'].fillna(value=1, axis=0)

        mean_squared_error = (self._api_df['difference'].sum()) / self._api_row_count
        return (1 - mean_squared_error) * 100

    def visualise_result(self):
        self._api_df['user_values'].plot()

    def visualise_api(self):
        self._api_df[self._keyword].plot()
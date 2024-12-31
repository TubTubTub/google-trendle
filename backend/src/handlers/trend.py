#%%
from PIL import Image
import pandas as pd
import numpy as np
import urllib.request

def get_simplest_test(): # 50x50
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIADIAZAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcBAwUECP/aAAgBAQAAAAD7+AAAFWdidgEM4Fo1rZYMVn25btYrOzTnQ7dPAVZacP5EnkADXCfPYQAP/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAhAAAAAAAAAP/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAxAAAAAAAAAP/8QAMRAAAQQBAgUBBgUFAAAAAAAAAwECBAUSBhEABxMUIRUQFiAiMDIjMUFCYhckM0BR/9oACAEBAAE/AP8AWseavrveVHKOs96rdNw+pD8aegm/C8ypvhpcGmzUMfMnGhbbVCXOsNH6xkhm2NUaLPiWMaIyGCVW2maiRBIYzmuAUJQ/N5VjWr9K215mY9Voar95rkEtsaSwJ+hXwlaVBn7ydi8YyA/N4G5n/hwHlna6p6Ezm5qP1z/ET3frmvhaeERvRJs8OSlm4lDuiyHKz+HEWJEr4kaDAiijRIwmBAALEGIQhpi1jGt2RrWomyInHMCASjv9Jcz64QWlqzJUXquVgkJQ2BGoUhCKJ7sYJUbJ+5rWjQnxypcSviSZ0+UKNEjCeY5zPQYhCGmTnvc7ZGtaibqq8f1TFddCNy101YaqKYpWd+jCQKMaAktjlI6wOzArU3cre2aVXY8e6NrqL8XXdx3EZ/n0KtV8asRq/skv8Gm+FUZEIrQFb+YOKysqaKACpoq2JX14MulGhhYAA83K92DBojU3cqqvtlQ4k+JJgT4oZMSSF4TgMxCCKIiYuY9rt0c1yLsqLxyqPLpIdzyztHlJM0eUMSEcrV3l0Z0V1cfJAhY5zBtUBMP3id8F7qqg0z2g7adhJlZ9pCAIkqbK6W2fbRQNeY3TR278Gri3yvBZvNLVAbWLWVMTRIPmFFsbVwrewduJPnbDiE6A9nuXB7jv+zyPgvKrR8+UCz1fGNqyyGEoWyNQubME1pVaqqKIjWRAO2G1MhCaq/HzKGHSt5pHmqMsON6bMDRXZTkFHYaluDjDuQrxvX+1OozN8tTHP2WnMTS1XdrpgcotnqPouKlNVBfMmN2wx66D3ZFa/qtxJIcMfD4XNHUM0Tz28TR1GzArQV7RWV0fJpfkOWSN8WNjuzJg2G8ouxONMaL0to0U1NPU4YpJpXGmSVV5pcwriPLnJkGV5TOyI7ZSOX6N1WQLqos6S0j9evsIhocoOTmdQB2KN7cmKjm7tXbdOOU9vYz9Hxqi/Uy6i04Z1BcuM4xHFlwWtRJKEOwbiNlDVh2v/wCP45KVFVU8qdAelVkSF3unqqbK7YLA9eUaGPMxcETMj/1cv1AxIkYks0eKIRZRUNIeNiNcYqDaJHkVPucjGNbuv6Iicf/EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8AZ//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AZ//Z"
def get_test_string():
    return "data:image/png;base64,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"
def get_bean_test():
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIADIAZAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABwgEBQYBAv/aAAgBAQAAAAC/wCvFhwA1tQrngBHiQwAiuR8DeD4jrkuizsGUvYh2TM13R9b6AAAH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAhAAAAAAAAAP/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAxAAAAAAAAAP/8QALxAAAQQBBAECBAQHAAAAAAAAAwECBAUGBxESEwAUIRYwMkEIIiMkEBUgJUBCYv/aAAgBAQABPwD5Gt+QmJmGi+A1Ur97Myusu5cYBSqckKuli/TeALHbjXm4/MnFiIBfmZBdRcaoLzJJwjEiVNfKsDsCiKVRRhqV6MRytRXqjfbdfMWV1rkum/4g88AWutcrzFKimiKWSUUCoPVy40QDRuZ9Uk+xFJ9C78/maqDn3tTW6f1Res+Vy1r55mEahotKxiknna1wzfUPYDXKmzSFZ5qVU1UbD6Prq4gYNDkGMTQ7AY0VbGg2YO0zPsAYI/Pm5NkYP5mAETNMqybU1D9tQPuxzGeBeYnwohv3s1vWYg3erks4tdxavWJnmSU0PI8evMZmkKOJa10qvO4KohWilDUTlYrkciORHe26eYZey8gxSntbIYRWqidGswBRUECyiPWPMCzdXbtEdj2Iu6ov2Vf6a21qrRJqVVnDm+illhS/TGYbokh25gJwVeBGbpyavunkLWvSGTPsa9mpOPIeD09rizhCAvc3m3pMRWjN/wBdarx8h4dO1LS41HlXsurny+PwLNjladKmrTrKKWwDxsTssVZzOx+71A5A+VepGSBDHpcl03yE2Whluhyg00NSVR0GJSpOjTpbggSMT7MIRCtevDwepRpaRq6swDLEvZEs8NYc+sLEjRnC5/rSZ+z4qRvyb8wvK5UVODXeWFln+Z1UHG/g3IcOPZ9Q7S5HPqjfy4CMUh0iOCcpHkJx6Rk628OfZ5FiRK+JGgwIoo0SMJgQACxBiEIacWsY1uyNa1E2RE/hZ6eZR8R38PGcmDjeH35i21u+qGxl2S0MBIhGR3vG4QAEaxhnF2U3b4mLZ5iFmeXhV8G4pJZRPPSZROmlLGc0LmOfDsnepK1r3cFUJWP+/FW+RbvVyihoPIMKr8kllNFUZcYkjhCCJUGklpx2hmLyGqvULmOchv8AdB+RdS6d4lSyxrMq2WMpglilxqylOY4RFZ7FghkAI123Jrhkcip5H0kpZqRZOoNrYZrZDKyS91yX+2odIyRlUNYLjEY3bdW7sc9Fdvy8kaZaaShRAH08xkgYglBHa+piuaESkcVWDRWflbzervIsSJXxI0GBFFGiRhMCAAWIMQhDTi1jGt2RrWomyIn+R//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8AZ//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AZ//Z"

from pytrends.request import TrendReq
import pandas as pd

pytrends = TrendReq(hl='en-GB', tz=0)
pd.set_option('display.max_rows', None)

class Trend:
    @staticmethod
    def get_data(keyword, timeframe):
        pytrends.build_payload(kw_list=[keyword], timeframe=[timeframe])
        return pytrends.interest_over_time()

word = 'bean'
trend_df = Trend.get_data(word, 'today 3-m')
trend_df[word] = trend_df[word] / 100
trend_df['user_values'] = np.nan
trend_df = trend_df.reset_index()
trend_row_count = len(trend_df)

response = urllib.request.urlopen(get_test_string())
image = Image.open(response).convert('L')
data = np.array(image)
df = pd.DataFrame(data)
row_count = len(df)
col_count = len(df.columns)

df

# %%

relevant = df[df.columns[df.mean(axis=0) > 0]]
for column_idx in relevant:
    black_values = df[column_idx][df[column_idx] != 0]

    if len(black_values) > 0:
        corresponding_row = int(column_idx / col_count * trend_row_count)
        mean = (row_count - black_values.index.values.mean()) / row_count
        trend_df.at[corresponding_row, 'user_values'] = mean

relevant

# %%
trend_df['user_values']
# %%
trend_df['user_values'].plot()
# %%
trend_df['user_values'] = trend_df['user_values'].interpolate(method='linear', axis=0)

if trend_df['user_values'].isnull().values.any():
    trend_df['user_values'] = trend_df['user_values'].bfill(axis=0)
    trend_df['user_values'] = trend_df['user_values'].ffill(axis=0)

trend_df['difference'] = np.square((trend_df['user_values'] - trend_df[word]))

if len(trend_df['difference']) == 0:
    print(0)
else:
    mean_squared_error = (trend_df['difference'].sum()) / trend_row_count
    print(100 - mean_squared_error * 1000)

trend_df
# %%

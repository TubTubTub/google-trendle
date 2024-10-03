#%%
from pytrends.request import TrendReq

pytrends = TrendReq(hl='en-GB', tz=0)

class Trend:
    @staticmethod
    def get_data(keyword, timeframe):
        pytrends.build_payload(kw_list=[keyword], timeframe=[timeframe])
        return pytrends.interest_over_time()
# %%

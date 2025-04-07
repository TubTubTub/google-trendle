import datetime
import os

from dotenv import load_dotenv
from redis import Redis

load_dotenv()

class Config:
    CORS_HEADERS = 'Content-Type'

    SQLALCHEMY_DATABASE_URI = os.getenv('POSTGRES_URL')
    SESSION_REDIS = Redis.from_url(os.getenv('REDIS_URL'))

    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = True
    PERMANENT_SESSION_LIFETIME = datetime.timedelta(hours=12)

    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_SAMESITE = 'None'

    SECRET_KEY = os.getenv('SESSION_SECRET_KEY')
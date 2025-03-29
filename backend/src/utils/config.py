from dotenv import load_dotenv
from redis import Redis
import datetime
import os

load_dotenv()

class Config:
    CORS_HEADERS = 'Content-Type'

    SQLALCHEMY_DATABASE_URI = os.getenv('POSTGRES_URL')

    SESSION_TYPE = 'redis'
    SESSION_REDIS = Redis.from_url(os.getenv('REDIS_URL'))
    SESSION_PERMANENT = True
    PERMANENT_SESSION_LIFETIME = datetime.timedelta(hours=12)

    SECRET_KEY = os.getenv('SESSION_SECRET_KEY')
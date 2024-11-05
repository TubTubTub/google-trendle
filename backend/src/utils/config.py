import os
import redis
from dotenv import load_dotenv
load_dotenv()

class Config:
    CORS_HEADERS = 'Content-Type'
    
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')

    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = True
    PERMANENT_SESSION_LIFETIME = 86400
    SESSION_REDIS = redis.from_url('redis://localhost:6379')

    SECRET_KEY = os.getenv('SESSION_SECRET_KEY')
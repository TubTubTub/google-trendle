import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    CORS_HEADERS = 'Content-Type'
    CORS_ORIGINS = ['http://localhost:5173']
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')
    SECRET_KEY = os.getenv('SESSION_SECRET_KEY')
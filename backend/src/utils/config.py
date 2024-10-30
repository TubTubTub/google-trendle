import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    CORS_HEADERS = 'Content-Type'
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')
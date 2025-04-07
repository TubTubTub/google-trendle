import os

from dotenv import load_dotenv
from flask import request
from redis import RedisError

from src import app

load_dotenv()

@app.errorhandler(404)
def handle_page_not_found(error):
    return { 'error': str(error), 'invalid_url': request.url }, 404

@app.errorhandler(RedisError)
def handle_redis_error(error):
    app.logger.error("Redis error has occured: %s", error)
    return { 'error': 'A problem occurred with our Redis service. Please try again later.' }, 500

@app.errorhandler(Exception)
def handle_other_errors(error):
    app.logger.error("Unhandled error has occured: %s", error)
    return {
        'error': 'A problem occurred within the server. Please try again later.',
        'details': str(error)
    }, 500

@app.before_request
def check_for_auth_key():
    if request.method == 'POST':
        if 'authKey' not in request.data or request.data['authKey'] != os.getenv('AUTH_KEY'):
            return {
                'error': 'Invalid authorisation key, '
                'please ensure key is identical for both frontend and backend'
            }, 401

    return None
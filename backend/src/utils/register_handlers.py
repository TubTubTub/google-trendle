import json
import os

from dotenv import load_dotenv
from flask import current_app, request
from redis import RedisError

load_dotenv()

@current_app.errorhandler(404)
def handle_page_not_found(error):
    return { 'error': str(error), 'invalid_url': request.url }, 404

@current_app.errorhandler(RedisError)
def handle_redis_error(error):
    current_app.logger.error("Redis error has occured: %s", error, exc_info=True)
    return { 'error': 'A problem occurred with our Redis service. Please try again later.' }, 500

@current_app.errorhandler(Exception)
def handle_other_errors(error):
    current_app.logger.error("Unhandled error has occured: %s", error, exc_info=True)
    return {
        'error': 'A problem occurred within the server. Please try again later.',
        'details': str(error)
    }, 500

@current_app.before_request
def check_for_auth_key():
    if request.method == 'POST':
        body = json.loads(request.data)

        if 'authKey' not in body or body['authKey'] != os.getenv('AUTH_KEY'):
            return {
                'error': 'Invalid authorisation key, '
                'please ensure key is identical for both frontend and backend'
            }, 401

    return None
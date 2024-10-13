from flask import Flask
from flask_cors import CORS
from json import dumps

from src.controllers.trends import trends_blueprint
from src.controllers.words import words_blueprint

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.errorhandler(404)
def handle_page_not_found(error):
    error_message = dumps({ 'error': 'unknown endpoint' })
    return error_message, 404

@app.errorhandler(Exception)
def handle_error(error):
    print('An error occured!', error)
    return error

app.register_blueprint(trends_blueprint, url_prefix='/api/trends')
app.register_blueprint(words_blueprint, url_prefix='/api/words')
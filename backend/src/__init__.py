from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from json import dumps

from src.utils.config import Config

app = Flask(__name__)
app.debug = True
app.config.from_object(Config)

with app.app_context():
    db = SQLAlchemy(app)
    cors = CORS(app)
    migrate = Migrate(app, db, command="mg")

    request_ctx = app.test_request_context()
    request_ctx.push()

    login_manager = LoginManager(app)
    login_manager.login_view = 'temp'

@app.errorhandler(404)
def handle_page_not_found(error):
    error_message = dumps({ 'error': 'unknown endpoint' })
    return error_message, 404

@app.route('/temp', methods=['GET'])
def temp():
    return 'someting'

# @app.errorhandler(Exception)
# def handle_error(error):
#     print('AN ERROR OCCURED (src.__init__.py):', str(error))
#     return dumps({ 'error': str(error) })


from src.models import *
import src.controllers
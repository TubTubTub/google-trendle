from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from json import dumps

from src.utils.config import Config

app = Flask(__name__)
app.debug = True
app.config.from_object(Config)
app.app_context().push()

CORS(app, supports_credentials=True)
Session(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db, command="mg")

@app.errorhandler(404)
def handle_page_not_found(error):
    error_message = dumps({ 'error': str(error) })
    return error_message, 404

# @app.errorhandler(Exception)
# def handle_error(error):
#     print('AN ERROR OCCURED (src.__init__.py):', str(error))
#     return dumps({ 'error': str(error) })

from src.models import *
import src.controllers
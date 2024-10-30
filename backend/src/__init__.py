from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from json import dumps

from src.config import Config
from src.routes.trends import trends_blueprint
from src.routes.words import words_blueprint

app = Flask(__name__)
app.debug = True
app.app_context().push()
app.config.from_object(Config)

db = SQLAlchemy(app)
cors = CORS(app)
migrate = Migrate(app, db, command="mg")
login_manager = LoginManager(app)

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

from src import models
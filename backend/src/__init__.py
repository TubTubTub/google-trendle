from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate
from flask_login import LoginManager, UserMixin
from json import dumps

import os
from dotenv import load_dotenv
load_dotenv()


from src.controllers.trends import trends_blueprint
from src.controllers.words import words_blueprint

app = Flask(__name__)
app.app_context().push()
app.debug = True

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
sa = SQLAlchemy(app)
migrate = Migrate(app, sa)

class Test(sa.Model):
    id = sa.Column(sa.Integer, primary_key=True)
    random = sa.Column(sa.String(20), unique=True, nullable=False)

    def __repr__(self):
        return f'{self.random} with id {self.id}'

login_manager = LoginManager()
login_manager.init_app(app)

class Users(UserMixin, sa.Model):
    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String(50), unique=False, nullable=False)

sa.create_all()

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
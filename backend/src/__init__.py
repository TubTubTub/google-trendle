from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_session import Session

import src.utils.logs_config
from src.database import db
from src.utils.config import Config

app = Flask(__name__)
app.debug = False
app.config.from_object(Config)
app.app_context().push()

CORS(app, supports_credentials=True)

Session(app)
db.init_app(app)
migrate = Migrate(app, db)

# pylint: disable=wrong-import-position
import src.controllers
import src.utils.register_handlers
from src.models import *

def get_app():
    return app
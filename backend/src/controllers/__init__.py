from flask import current_app

from src.controllers.healthcheck import healthcheck_blueprint
from src.controllers.statistics import statistics_blueprint
from src.controllers.trends import trends_blueprint
from src.controllers.users import users_blueprint
from src.controllers.words import words_blueprint

current_app.register_blueprint(healthcheck_blueprint, url_prefix='/api/healthcheck')
current_app.register_blueprint(statistics_blueprint, url_prefix='/api/statistics')
current_app.register_blueprint(trends_blueprint, url_prefix='/api/trends')
current_app.register_blueprint(words_blueprint, url_prefix='/api/words')
current_app.register_blueprint(users_blueprint, url_prefix='/api/users')
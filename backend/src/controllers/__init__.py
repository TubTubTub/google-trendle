from src.controllers.trends import trends_blueprint
from src.controllers.words import words_blueprint
from src.controllers.users import users_blueprint
from src.controllers.statistics import statistics_blueprint
from src import app

app.register_blueprint(trends_blueprint, url_prefix='/api/trends')
app.register_blueprint(words_blueprint, url_prefix='/api/words')
app.register_blueprint(users_blueprint, url_prefix='/api/users')
app.register_blueprint(statistics_blueprint, url_prefix='/api/statistics')
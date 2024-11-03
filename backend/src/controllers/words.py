from flask import Blueprint
from flask_cors import cross_origin
from flask_login import current_user
from src import app

from src.handlers.word import Word

words_blueprint = Blueprint('words', __name__)

@words_blueprint.get('/')
@cross_origin()
def get_random_word():
    with app.app_context():
        print('(login) Current user:', current_user)
        while True:
            word = Word.get_random_word()

            if (len(word) != 1):
                return word
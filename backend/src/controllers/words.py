from flask import Blueprint
from src import app

from src.handlers.word import Word

words_blueprint = Blueprint('words', __name__)

@words_blueprint.get('/')
def get_random_word():
    while True:
        word = Word.get_random_word()

        if (len(word) != 1):
            return word
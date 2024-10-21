from flask import Blueprint
from flask_cors import cross_origin

from src.models.word import Word

words_blueprint = Blueprint('words', __name__)

@words_blueprint.get('/')
@cross_origin()
def get_random_word():
    while True:
        word = Word.get_random_word()

        if (len(word) != 1):
            return word
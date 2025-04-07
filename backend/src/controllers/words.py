from flask import Blueprint

from src.handlers.word import Word

words_blueprint = Blueprint('words', __name__)

@words_blueprint.post('/word')
def get_random_word():
    word = ''

    while len(word) <= 1:
        word = Word.get_random_word()

    return { 'word': word }, 200
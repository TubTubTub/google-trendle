import json

from flask import Blueprint, current_app, request

from src.database import db
from src.handlers import Trend
from src.models import User, UserWord, Word

trends_blueprint = Blueprint('trends', __name__)

@trends_blueprint.post('/submit')
def process_submit():
    body = json.loads(request.data)

    try:
        trend = Trend(keyword=body['word'], timeframe=body['timeframe'], data_url=body['dataURL'])
        score = trend.calculate_score()
        raw_data = trend.get_raw_data()
    except Exception as error:
        return { 'error': str(error) }, 500

    current_app.logger.info(
        'Processing submit request: %s | %s | %s | %s',
        body['word'], body['timeframe'], body['dataURL'][:15], body['userId']
    )

    update_word_table(body['word'], score)
    update_association_table(body['word'], score, body['userId'])

    word = db.session.get(Word, body['word'])

    return {
        'score': int(score),
        'globalAttempts': word.global_attempts,
        'globalAverage': round(word.global_average, 1),
        'rawData': raw_data
    }, 200

def update_word_table(game_word, score):
    word = db.session.get(Word, game_word)

    if word is None:
        word = Word(id=game_word)
        db.session.add(word)
        db.session.commit()
        current_app.logger.info('Adding to word database: %r', word)

    word.global_average = (
        word.global_attempts * word.global_average + score
    ) / (word.global_attempts + 1)

    word.global_attempts += 1

    current_app.logger.info('Updating word statistics: %r', word)

    db.session.commit()

def update_association_table(game_word, score, user_id):
    user = db.session.get(User, user_id) if user_id else None
    word = db.session.get(Word, game_word)

    if user is None or user_id is None:
        current_app.logger.info(
            'Not updating, user not found: %s',
            user_id
        )
        return

    new_entry = UserWord(score=score)
    new_entry.word = word
    db.session.add(new_entry)

    user.average_score = (
        len(user.words) * user.average_score + score
    ) / (len(user.words) + 1)
    user.words.append(new_entry)

    current_app.logger.info(
        'Updating UserWord association: %r',
        new_entry
    )
    current_app.logger.info(
        'Updating User statistics: %r',
        user
    )

    db.session.commit()
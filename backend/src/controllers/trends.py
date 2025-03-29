from flask import Blueprint, abort, Response, request, session
import json

from src.models import User, Word, UserWord
from src.handlers import Trend
from src import db

trends_blueprint = Blueprint('trends', __name__)

def handle_missing_keyword(keyword):
    keyword = keyword or 'unspecified keyword'
    error_message = json.dumps({ 'error': f'{keyword.capitalize()} not provided' })
    abort(Response(error_message, 400))

@trends_blueprint.get('/<keyword>')
def trend(keyword):
    timeframe = request.args.get('timeframe')

    if timeframe is None:
        handle_missing_keyword('timeframe')

    data = Trend.get_data(keyword, 'today 1-m')
    return data.to_dict()

@trends_blueprint.route('/submit', methods=['POST', 'GET'])
def process_submit():
    if request.method == 'POST':
        body = json.loads(request.data)

        trend = Trend(keyword=body['word'], timeframe=body['timeframe'], data_url=body['dataURL'])
        score = trend.calculate_score()

        if request.method != 'POST':
            print('\n(process_submit) Handling unknown request', request)
            return 'hi', 204

        body = request.get_json()

        print('\nReceived body!', f'[ {body["dataURL"][:30]}... ]')

        update_word_table(body['word'], score)
        update_association_table(body['word'], score)

        word = db.session.get(Word, body['word'])

        return { 'score': int(score), 'globalAttempts': word.global_attempts, 'globalAverage': round(word.global_average, 1) }, 200

    return '', 204

def get_user():
    if session.get('userId') is None:
        print('\n(get_user) No session userId found!')
        return None
    else:
        return db.session.get(User, session['userId'])

def update_word_table(game_word, score):
    word = db.session.get(Word, game_word)

    if word is None:
        word = Word(id=game_word)
        db.session.add(word)
        db.session.commit()
        print(f'\n(update_word_table) Adding to word database:', word)

    word.global_average = (word.global_attempts * word.global_average + score) / (word.global_attempts + 1)
    word.global_attempts += 1

    print(f'\n(update_word_table) Updating word statistics:', word)

    db.session.commit()

def update_association_table(game_word, score):
    user = get_user()
    word = db.session.get(Word, game_word)

    if user is None:
        print('\n(update_association_table) Not updating - no session userId found')
        return

    new_entry = UserWord(score=score)
    new_entry.word = word
    db.session.add(new_entry)

    user.average_score = (len(user.words) * user.average_score + score) / (len(user.words) + 1)
    user.words.append(new_entry)

    print('\n(update_association_table) Updating UserWord association:', new_entry)
    print('\n(update_association_table) Updating User statistics:', user)

    db.session.commit()
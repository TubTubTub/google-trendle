from flask import Blueprint, abort, Response, request, session
from json import dumps

from src import db
from src.handlers.trend import Trend
from src.models import User, Word

trends_blueprint = Blueprint('trends', __name__)

def handle_missing_keyword(keyword):
    keyword = keyword or 'unspecified keyword'
    error_message = dumps({ 'error': f'{keyword.capitalize()} not provided' })
    abort(Response(error_message, 400))

@trends_blueprint.get('/<keyword>')
def trend(keyword):
    timeframe = request.args.get('timeframe')

    if timeframe is None:
        handle_missing_keyword('timeframe')

    data = Trend.get_data(keyword, 'today 1-m')
    return data.to_dict()

@trends_blueprint.route('', methods=['POST', 'GET'])
def process_submit():
    if request.method != 'POST':
        print('(process_submit) Handling unknown request', request)
        return 'hi', 204
    body = request.get_json()
    # parsed_data_url = Trend.parse_data_url(body['data_url'])
    '''TEMP RESULTS'''
    result = {
        'score': 69
    }

    update_word_table(body['word'], result['score'])
    update_user_table(body['word'], result['score'])
    
    print('Received body!', f'{body['data_url'][:30]}...')
    return body

def get_user():
    if session.get('userId') is None:
        return None
    else:
        return db.session.get(User, session['userId'])

def update_word_table(game_word, score):
    word = db.session.get(Word, game_word)
    user = get_user()

    if word is None:
        word = Word(id=game_word, global_attempts=0, global_average=0)
        db.session.add(word)
        db.session.commit()
    
    word.global_average = (word.global_attempts * word.global_average + score) / (word.global_attempts + 1)
    word.global_attempts += 1

    if user:
        word.users.append(user)

    db.session.commit()

def update_user_table(game_word, score):
    user = get_user()
    word = db.session.get(Word, game_word)

    if user is None:
        print('(update_user_database) Not updating: no session userId found')
        return
    
    user.words.append(word)
    db.session.commit()

    print('(update_user_database) User words:', user.words)

def update_association_table(word):
    if session.get('userId') is None:
        user = None
    else:
        user = db.session.get(User, session['userId'])
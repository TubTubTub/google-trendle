from flask import Blueprint, session, request

from src import db
from src.handlers.trend import Trend
from src.models import User, Word, UserWord

statistics_blueprint = Blueprint('statistics', __name__)

@statistics_blueprint.get('/history')
def get_history():
    if session.get('userId') is None:
        print('GOT NOTHING')
        return [], 200
    
    history = db.session.scalars(db.select(UserWord).filter_by(user_id=session['userId']))
    
    result = [{
        'word': game.word.id,
        'score': game.score,
        'date': game.updated_dt.strftime('%d/%m/%Y')
    } for game in history.all()]

    return list(reversed(result)), 200

@statistics_blueprint.route('/rankings', methods=['GET'])
def get_rankings():
    try:
        page = int(request.args.get('page'))
        page_size = int(request.args.get('page_size'))
    except:
        page = 0
        page_size = 30

    rankings = db.session.query(User).order_by(User.average_score.desc()) \
        .limit(page_size) \
        .offset(page * page_size)

    result = [{
        'name': user.name,
        'averageScore': user.average_score
    } for user in rankings.all()]

    return result, 200
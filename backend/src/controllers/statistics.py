from flask import Blueprint, abort, Response, request, session
from json import dumps
from random import randint

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

@statistics_blueprint.get('/rankings')
def get_rankings():
    rankings = db.session.scalars()
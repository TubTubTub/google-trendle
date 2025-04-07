import json
import math

from flask import Blueprint, request
from sqlalchemy import func

from src.database import db
from src.models import User, UserWord

statistics_blueprint = Blueprint('statistics', __name__)

@statistics_blueprint.post('/history')
def get_history():
    body = json.loads(request.data)

    try:
        page = int(request.args.get('page'))
        page_size = int(request.args.get('page_size'))
    except TypeError:
        page = 1
        page_size = 30

    relevant_rows = db.session.query(UserWord).filter_by(user_id=body['userId'])
    number_of_rows = relevant_rows.count()
    offset = (page - 1) * page_size

    if offset > number_of_rows:
        return { 'error': 'page number exceeds number of database entries' }, 400

    history = relevant_rows.order_by(UserWord.updated_dt.desc()) \
        .limit(page_size) \
        .offset(offset)

    result = [{
        'word': game.word.id,
        'score': game.score,
        'date': game.updated_dt.strftime('%d/%m/%Y')
    } for game in history.all()]

    return { 'history': result, 'page_count': math.ceil(number_of_rows / page_size) }, 200

@statistics_blueprint.post('/rankings')
def get_rankings():
    try:
        page = int(request.args.get('page'))
        page_size = int(request.args.get('page_size'))
    except TypeError:
        page = 1
        page_size = 30

    number_of_rows = db.session.query(User).count()
    offset = (page - 1) * page_size

    if offset > number_of_rows:
        return { 'error': 'page number exceeds number of database entries' }, 400

    rankings = db.session.query(User).order_by(User.average_score.desc()) \
        .limit(page_size) \
        .offset(offset)

    result = [{
        'name': user.name,
        'averageScore': user.average_score
    } for user in rankings.all()]

    return { 'rankings': result, 'page_count': math.ceil(number_of_rows / page_size) }, 200

@statistics_blueprint.post('/user')
def get_user_statistics():
    body = json.loads(request.data)

    user = db.session.get(User, body['userId'])
    ranks = db.session.query(
        User,
        func.row_number().over(
            partition_by=None,
            order_by=User.average_score.desc()
        )
    ).all()

    for row, rank in ranks:
        if row.id == user.id:
            return { 'averageScore': user.average_score, 'rank': rank }, 200

    return { 'averageScore': None, 'rank': None }, 200
from flask import Blueprint, abort, Response, request
from flask_cors import cross_origin
from json import dumps

from src.models.trend import Trend

trends_blueprint = Blueprint('trends', __name__)

def handle_missing_keyword(keyword):
    keyword = keyword or 'unspecified keyword'
    error_message = dumps({ 'error': f'{keyword.capitalize()} not provided' })
    abort(Response(error_message, 400))

@trends_blueprint.get('/<keyword>')
@cross_origin()
def trend(keyword):
    timeframe = request.args.get('timeframe')

    if timeframe is None:
        handle_missing_keyword('timeframe')

    data = Trend.get_data(keyword, 'today 1-m')
    return data.to_dict()

@trends_blueprint.post('')
@cross_origin()
def compute_similarity():
    body = request.get_json()
    print('Received body!', f'{body['data_url'][:30]}...')
    return body
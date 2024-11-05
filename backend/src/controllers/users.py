from flask import Blueprint, request, session
from flask_cors import cross_origin
import sqlalchemy as sa
import json

from src import db
from src.models import User

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/test', methods=['GET'])
def test():
    user_id = session.get('userId') or 'no id in redis database'
    return user_id

@users_blueprint.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        body = json.loads(request.data)

        if session.get('userId'):
            print('(login) Already logged in!')
            return session['userId']
        
        user = db.session.scalar(
            sa.select(User).where(User.id == body['userId'])
        )

        if user is None:
            user = User(id=body['userId'], name=body['name'])
            print('(login) Registering new user:', user)
            db.session.add(user)
            db.session.commit()

        print('(login) Logging in:', user)
        session['userId'] = body['userId']
        session.modified = True

        return repr(user)

    return '', 204

@users_blueprint.route('/logout', methods=['POST', 'GET'])
def logout():
    if request.method == 'POST':
        if session.get('userId') is None:
            return {'error': 'logout failed, user not signed in'}, 401

        print('(logut) Logging out of user:', session['userId'])
        removed_user_id = session.pop('userId', default=None)
        return removed_user_id, 204

    return '', 204
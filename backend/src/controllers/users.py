from flask import Blueprint, request, session
import sqlalchemy as sa
import json

from src.models import User
from src import db

users_blueprint = Blueprint('users', __name__)

def get_user_from_database(user_id, name, picture_url):
    user = db.session.scalar(
        sa.select(User).where(User.id == user_id)
    )

    if user is None:
        user = User(id=user_id, name=name, picture_url=picture_url)
        print('(get_user_from_database) Registering new user:', user)
        db.session.add(user)
        db.session.commit()

    return user

@users_blueprint.route('/test', methods=['GET', 'POST'])
def test():
    print('(test) TEST REQUEST:', request)
    user_id = session.get('userId') or 'no id in redis database'
    return user_id

@users_blueprint.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        body = json.loads(request.data)

        if session.get('userId'):
            user = get_user_from_database(body['userId'], body['name'], body['picture'])

            print('(login) Already logged in!', session['userId'])
            return session['userId']

        user = get_user_from_database(body['userId'], body['name'], body['picture'])

        print('(login) Logging in:', user)

        session['userId'] = body['userId']
        session.modified = True

        return repr(user)

    return '', 204

@users_blueprint.route('/logout', methods=['POST', 'GET'])
def logout():
    if request.method == 'POST':
        if session.get('userId') is None:
            print('(logout) logout failed, user not signed in')
            return {'error': 'logout failed, user not signed in'}, 401

        print('(logut) Logging out of user:', session['userId'])
        removed_user_id = session.pop('userId', default=None)
        return removed_user_id, 204

    return '', 204

@users_blueprint.route('/autologin', methods=['GET'])
def auto_login():
    if session.get('userId') is None:
        print("(auto_login) No user id found, not sending auto-login information")
        return {}, 204

    user = db.session.get(User, session['userId'])

    if user is None:
        print("(auto_login) Corresponding user not found in database, not sending auto-login information", session['userId'])
        return {}, 204

    return { 'id': user.id, 'name': user.name, 'picture': user.picture_url }, 200
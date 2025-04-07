import json

import sqlalchemy as sa
from flask import Blueprint, current_app, request, session

from src.database import db
from src.models import User

users_blueprint = Blueprint('users', __name__)

@users_blueprint.post('/test-in-database')
def test_in_database():
    body = json.loads(request.data)

    user = db.session.scalar(
        sa.select(User).where(User.id == body['userId'])
    )
    if user:
        return user.__dict__, 200

    return { 'message': f'no user found with id {body['userId']}' }, 204

@users_blueprint.post('/test-session')
def test_logged_in():
    return { 'User ID in session': session['userId'] if 'userId' in session else None }, 200

@users_blueprint.post('/login')
def login():
    body = json.loads(request.data)

    user = db.session.scalar(
        sa.select(User).where(User.id == body['userId'])
    )

    if user is None:
        user = User(id=body['userId'], name=body['name'], picture_url=body['picture'])
        current_app.logger.info('Registering new user: %r', user)
        db.session.add(user)
        db.session.commit()

    if 'userId' in session:
        current_app.logger.info(
            'Relogging in from %s as %s',
            session['userId'], body['userId']
        )

    current_app.logger.info(
        'Logging in user | ID: %s | Name: %s',
        body['userId'], body['name']
    )

    session['userId'] = body['userId']
    session.modified = True

    return {}, 204

@users_blueprint.post('/logout')
def logout():
    if 'userId' in session:
        current_app.logger.info('Logging out of user: %s', session['userId'])
        session.pop('userId')
        session.modified = True
        return {}, 204

    current_app.logger.info('Logout request received without user signed in')
    return {}, 204

@users_blueprint.post('/autologin')
def autologin():
    if 'userId' in session:
        user = db.session.get(User, session['userId'])

        if user is None:
            return {
                'error': 'User ID cached without user being registered while autologging in'
            }, 500

        return { 'id': user.id, 'name': user.name, 'picture': user.picture_url }, 200

    current_app.logger.info("No user ID in session, not sending auto-login information")
    return {}, 204
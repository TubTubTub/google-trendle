from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from flask_cors import cross_origin
import sqlalchemy as sa
import json

from src import db
from src.models import User

users_blueprint = Blueprint('users', __name__)

@users_blueprint.post('/login')
# @cross_origin()
def login():
    body = request.get_json()
    print(body,' attempting login')
    if current_user.is_authenticated:
        print('already logged in')
        return json.dumps({ 'user': repr(current_user) })
    
    user = db.session.scalar(
        sa.select(User).where(User.id == body['userId'])
    )

    if user is None:
        print('failed login, cannot find user')
        new_user = User(id=body['userId'], name=body['name'])
        db.session.add(new_user)
        db.session.commit()

        print('registering new user')
        login_user(new_user, remember=True) 
        return json.dumps({ 'user': repr(new_user) })
    else:
        login_user(user, remember=True)
        print('logging in with user', user)
        return json.dumps({ 'user': repr(user) })

@users_blueprint.post('/logout')
# @cross_origin()
@login_required
def logout():
    logout_user()
    print('logged out')
    return 'successfully logged out'
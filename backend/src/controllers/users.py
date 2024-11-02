from flask import Blueprint, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
from flask_cors import cross_origin
import sqlalchemy as sa
import json

from src import db
from src.models import User

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/login', methods=['POST', 'GET'])
@cross_origin()
def login():
    if request.method == 'POST':
        body = json.loads(request.data)

        if current_user.is_authenticated:
            print('already logged in')
            return json.dumps({ 'user': repr(current_user) })
        
        user = db.session.scalar(
            sa.select(User).where(User.id == body['userId'])
        )

        if user is None:
            print('registering new user')
            user = User(id=body['userId'], name=body['name'])
            db.session.add(user)
            db.session.commit()

        print('logging in with user', user)
        login_user(user)

        return redirect('/')

@users_blueprint.route('/logout', methods=['POST', 'GET'])
@cross_origin()
@login_required
def logout():
    if request.method == 'POST':
        logout_user()
        print('logged out')
        return redirect('/')
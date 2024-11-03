from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from flask_cors import cross_origin
import sqlalchemy as sa
import json

from src import db,app
from src.models import User

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/login', methods=['POST', 'GET'])
@cross_origin()
def login():
    with app.app_context():
        print(app.app_context())
        if request.method == 'POST':
            body = json.loads(request.data)

            if current_user.is_authenticated:
                print('(login) Already logged in!')
                return json.dumps({ 'user': repr(current_user) })
            
            user = db.session.scalar(
                sa.select(User).where(User.id == body['userId'])
            )

            if user is None:
                user = User(id=body['userId'], name=body['name'])
                print('(login) Registering new user:', user)
                db.session.add(user)
                db.session.commit()

            print('(login) Logging in:', user)
            login_user(user)
            print('(login) Current user:', current_user)

            return 'wow'

        return 'okay'

@users_blueprint.route('/logout', methods=['POST', 'GET'])
@cross_origin()
def logout():
    with app.app_context():
        if request.method == 'POST':
            print('(logut) Logging out of user:', current_user)
            logout_user()
            print('(logut) Current user:', current_user)
            return 'yay'
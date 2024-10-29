import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '../', '../'))
from src import login_manager, Users, sa
from flask_login import login_user, logout_user

@login_manager.user_loader
def load_user(id):
    return sa.session.get(Users, id)

def register(id, name):
    user = Users(id=id, name=name)
    sa.session.add(user)
    sa.session.commit()

def login(id):
    user = sa.session.get(Users, id)
    login_user(user)

def logout():
    logout_user()

# register(111, 'nameMan')
login(111)
logout(111)
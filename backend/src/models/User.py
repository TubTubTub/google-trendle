from flask_login import UserMixin
from src import db, login_manager

class User(UserMixin, db.Model):
    id = db.Column(db.String(23), primary_key=True)
    name = db.Column(db.String(64), nullable=False, unique=False)

    def __repr__(self):
        return f'(User {self.id}: {self.name})'

@login_manager.user_loader
def load_user(id):
    user = db.session.get(User, str(id))
    print('getting user', id, user)
    return db.session.get(User, str(id))
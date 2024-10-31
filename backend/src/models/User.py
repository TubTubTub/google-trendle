from flask_login import UserMixin
from src import db, login_manager

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)

    def __repr__(self):
        return f'(User {self.id}: {self.name})'

@login_manager.user_loader
def load_user(id):
    return db.session.get(User, int(id))
from flask_login import UserMixin
from src import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.id}: {self.name}>'
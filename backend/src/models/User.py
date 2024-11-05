from flask_login import UserMixin
from src import db
    
class User(UserMixin, db.Model):
    id = db.Column(db.String(23), primary_key=True)
    name = db.Column(db.String(64), nullable=False, unique=False)

    def __repr__(self):
        return f'(User {self.id}: {self.name})'
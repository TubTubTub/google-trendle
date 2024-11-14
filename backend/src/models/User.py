from src import db
from src.models.UserWord import UserWord
    
class User(db.Model):
    id = db.Column(db.String(23), primary_key=True)
    name = db.Column(db.String(64), nullable=False, unique=False)
    picture_url = db.Column(db.String(128), nullable=True, unique=False)
    average_score = db.Column(db.Float, nullable=False, default=0)
    words = db.relationship('UserWord', back_populates='user')

    def __repr__(self):
        return f'(User {self.id} | Name: {self.name} | Average score: {self.average_score})'
from datetime import datetime

from src.database import db

class UserWord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    updated_dt = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    user_id = db.Column(db.String(23), db.ForeignKey('user.id'))
    word_id = db.Column(db.String(128), db.ForeignKey('word.id'))
    score = db.Column(db.Integer, nullable=False)

    word = db.relationship('Word', back_populates='users')
    user = db.relationship('User', back_populates='words')

    def __repr__(self):
        return f'(UserWord {self.user.id}: {self.word.id} | {self.score})'
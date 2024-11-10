from datetime import datetime, timezone
from src import db
from sqlalchemy import func

# user_word = db.Table('user_word',
#                         db.Column('id', db.Integer, primary_key=True),
#                         db.Column('user_id', db.String(23), db.ForeignKey('user.id')),
#                         db.Column('word_id', db.String(128), db.ForeignKey('word.id')),
#                         db.Column('updated_dt', db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now),
#                     )

# class UserWord(db.Model):
#     id = db.Column(db.Integer, primary_key=True),
#     user_id = db.Column(db.String(23), db.ForeignKey('user.id'))
#     word_id = db.Column(db.String(128), db.ForeignKey('word.id'))
#     updated_dt = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

#     user = db.relationship('User', back_populates='words')
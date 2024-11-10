from src import db
from src.models.user_word import user_word

class Word(db.Model):
    id = db.Column(db.String(128), primary_key=True)
    global_attempts = db.Column(db.Integer, nullable=False)
    global_average = db.Column(db.Float, nullable=False)
    users = db.relationship('User', secondary=user_word, back_populates='words')
    
    def __repr__(self):
        return f'(Word {self.id} | GlbAttempts: {self.global_attempts}, GlbAverage: {self.global_average})'
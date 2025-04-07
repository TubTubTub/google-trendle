from src.database import db

class Word(db.Model):
    id = db.Column(db.String(256), primary_key=True)
    global_attempts = db.Column(db.Integer, nullable=False, default=0)
    global_average = db.Column(db.Float, nullable=False, default=0)
    users = db.relationship('UserWord', back_populates='word')

    def __repr__(self):
        return f'(Word {self.id} | ' \
               f'GlbAttempts: {self.global_attempts}, ' \
               f'GlbAverage: {self.global_average})'
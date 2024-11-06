from src import db
from src.models.user_word import user_word
    
class User(db.Model):
    id = db.Column(db.String(23), primary_key=True)
    name = db.Column(db.String(64), nullable=False, unique=False)
    words = db.relationship('Word', secondary=user_word, back_populates='words')

    def __repr__(self):
        return f'(User {self.id}: {self.name})'
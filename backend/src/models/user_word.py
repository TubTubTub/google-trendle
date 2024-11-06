from src import db

user_word = db.Table('user_word',
                        db.Column('id', db.Integer, primary_key=True),
                        db.Column('user_id', db.String(23), db.ForeignKey('user.id')),
                        db.Column('word_id', db.String(128), db.ForeignKey('word.id'))
                    )
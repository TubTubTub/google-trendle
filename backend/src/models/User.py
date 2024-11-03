from flask_login import UserMixin
from src import db, login_manager, app

@login_manager.user_loader
def load_user(id):
    with app.app_context():
        user = db.session.get(User, str(id))
        print('(user_loader) Fetching user:', user)
        return user
    
class User(UserMixin, db.Model):
    id = db.Column(db.String(23), primary_key=True)
    name = db.Column(db.String(64), nullable=False, unique=False)

    def __repr__(self):
        return f'(User {self.id}: {self.name})'
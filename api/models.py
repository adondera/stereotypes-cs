from api import db
from flask_bcrypt import generate_password_hash


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(80), nullable=False)

    def __init__(self, name=None, password=None):
        self.username = name
        self.password = password

    def create_user(self):
        print("Enter a username:")
        username = input()
        print("Enter a password:")
        password = input()
        hashed_pw = generate_password_hash(password).decode('utf-8')
        db.session.add(User(username, hashed_pw))
        db.session.commit()
        
    def __repr__(self):
        return '<User %r>' % self.username

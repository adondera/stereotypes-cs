from api import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)

    def __init__(self, name=None, email=None):
        self.username = name
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username

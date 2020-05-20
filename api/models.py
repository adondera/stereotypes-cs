# pylint: disable=invalid-name, too-many-arguments
""" Models for the database schema."""
import datetime

from flask_bcrypt import generate_password_hash
from sqlalchemy import func
from sqlalchemy.sql import expression

from api import db
import enum

class User(db.Model):
    """Class that contains database schema for User table."""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

    @staticmethod
    def create_user(username, password):
        """
        Method to create a new user instance in the database.

        Parameters:
        username (string): user's username
        password (string): user's password

        Raise exception and rollback transaction if failed to add a new user to the database.
        Close connection if insertion is successful.

        """
        hashed_pw = generate_password_hash(password).decode('utf-8')
        try:
            db.session.add(User(username, hashed_pw))
            db.session.commit()
        except:
            db.session.rollback()
            raise
        finally:
            db.session.close()

    def __repr__(self):
        return '<User %r>' % self.username


class Consent(db.Model):
    """Class that contains information from the consent forms"""

    __tablename__ = 'consent'

    id = db.Column(db.Integer, primary_key=True)
    parent_first_name = db.Column(db.String(40), nullable=False)
    parent_last_name = db.Column(db.String(40), nullable=False)
    signature = db.Column(db.Text(), nullable=False, unique=True)


    @staticmethod
    def create_consent(child_first_name, child_last_name,
                       parent_first_name, parent_last_name, signature):
        """Creates a consent form row in the database"""
        consent = Consent(child_first_name, child_last_name,
                          parent_first_name, parent_last_name, signature)
        try:
            db.session.add(consent)
            db.session.commit()
        except:
            db.session.rollback()
            raise
        finally:
            db.session.close()

    def __repr__(self):
        return '<Consent form id: %r>' % self.id

class Gender(enum.Enum):
    male = 1
    female = 2
    other = 3

class Participant(db.Model):

    __tablename__ = 'participants'

    id = db.Column(db.Integer, primary_key=True)
    consent_id = db.Column(db.Integer, db.ForeignKey("consent.id"), nullable=False)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    age = db.Column(db.Integer, db.CheckConstraint('age > 5 and age < 19'), nullable=False)
    gender = db.Column(db.Enum(Gender), nullable=False)
    ethnicity = db.Column(db.ARRAY(db.String), nullable=False)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return '<Participant id: %r>' % self.id


class Metacategory(enum.Enum):
    profession = 1
    gender = 2
    hobby = 3
    social = 4


class Category(db.Model):

    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    metacategory = db.Column(db.Enum(Metacategory), nullable=False)


    def __repr__(self):
        return '<Category id: %r>' % self.id


class Image(db.Model):

    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)
    link = db.Column(db.Text, nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    attribute = db.Column(db.String(40), nullable=False)

    def __repr__(self):
        return '<Consent form id: %r>' % self.id

class QuestionType(enum.Enum):
    mc_single_answer = 1
    mc_multiple_answer = 2
    likert = 3
    binary = 4

class Question(db.Model):

    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    img_id = db.Column(db.Integer, db.ForeignKey("images.id"), nullable=True)
    text = db.Column(db.Text, nullable=False)
    type = db.Column(db.Enum(QuestionType), nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default=expression.true())

    def __repr__(self):
        return '<Question id: %r>' % self.id

class QuestionChoice(db.Model):

    __tablename__ = 'question_choices'

    choice_num = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), primary_key=True)
    img_id = db.Column(db.Integer, db.ForeignKey("images.id"), nullable=True)
    text = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default=expression.true())

    def __repr__(self):
        return '<Question choice id: %r>' % (str(self.question_id) + str(self.choice_num))

class

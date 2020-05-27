# pylint: disable=invalid-name, too-many-arguments
""" Models for the database schema."""

from flask_bcrypt import generate_password_hash
from sqlalchemy import func
from sqlalchemy.sql import expression

from api import db
import enum


def add_to_db(obj):
    """
    Method to add an object in the database.

    Parameters:
    obj (object's type must be a class from models.py): the object to be added in the database

    Raise exception and rollback transaction if failed to add a new user to the database.
    Close connection if insertion is successful.
    """
    try:
        db.session.add(obj)
        db.session.commit()
    except:
        db.session.rollback()
        raise
    # commented this so that we can use object attributes after adding them to database
    # if it's not commented you get an error because the object must have a session
    # finally:
    #     db.session.close()
    

class User(db.Model):
    """Class that maps the User object to the corresponding database table ('users' table)."""

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
        add_to_db(User(username=username, password=hashed_pw))

    def __repr__(self):
        return '<User %r>' % self.username


class Consent(db.Model):
    """Class that maps the Consent object to the corresponding database table ('consents' table)."""

    __tablename__ = 'consent'

    id = db.Column(db.Integer, primary_key=True)
    parent_first_name = db.Column(db.String(40), nullable=False)
    parent_last_name = db.Column(db.String(40), nullable=False)
    signature = db.Column(db.Text(), nullable=False)

    @staticmethod
    def create_consent(parent_first_name, parent_last_name, signature):
        """Creates a consent form row in the database"""
        consent = Consent(parent_first_name=parent_first_name, parent_last_name=parent_last_name, signature=signature)
        add_to_db(consent)

    def __repr__(self):
        return '<Consent form id: %r>' % self.id


class Gender(enum.Enum):
    """Enum choices for gender types"""

    male = 1
    female = 2
    other = 3


class Participant(db.Model):
    """Class that maps the Participant object to the corresponding database table ('participants' table)."""

    __tablename__ = 'participants'

    __table_args__ = (
        db.CheckConstraint('age >= 6 and age <= 18', name='check_age_requirements'), {})

    id = db.Column(db.Integer, primary_key=True)
    consent_id = db.Column(db.Integer, db.ForeignKey(Consent.id), nullable=False)
    first_name = db.Column(db.String(40), nullable=True)
    last_name = db.Column(db.String(40), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.Enum(Gender), nullable=True)
    ethnicity = db.Column(db.ARRAY(db.String(40)), nullable=True)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return '<Participant id: %r>' % self.id


class Metacategory(enum.Enum):
    """Enum choices for metacategories"""

    profession = 1
    gender = 2
    hobby = 3
    social = 4


class Category(db.Model):
    """Class that maps the Category object to the corresponding database table ('categories' table)."""

    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    metacategory = db.Column(db.Enum(Metacategory), nullable=False)
    questions = db.relationship("Question", secondary="questions_to_categories", lazy=False)
    images = db.relationship("Image", backref=db.backref('category', lazy='joined'), lazy='joined')
    
    def __repr__(self):
        return '<Category id: %r>' % self.id


class Image(db.Model):
    """Class that maps the Image object to the corresponding database table ('images' table)."""

    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey(Category.id), nullable=False)
    link = db.Column(db.Text, nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    attribute = db.Column(db.String(40), nullable=False)
    questions = db.relationship("Question", backref=db.backref('image', lazy='joined'), lazy='joined')

    def __repr__(self):
        # return '<Image id: %r>' % self.id
        return self.link


class QuestionType(enum.Enum):
    """Enum choices for question types"""

    mc_single_answer = 1
    mc_multiple_answer = 2
    likert = 3
    binary = 4
    video = 5

    def __repr__(self):
        # return '<QuestionType id: %r>' % self.id
        return str(self.value)


class Question(db.Model):
    """Class that maps the Question object to the corresponding database table ('questions' table)."""

    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    img_id = db.Column(db.Integer, db.ForeignKey(Image.id), nullable=True)
    text = db.Column(db.Text, nullable=True)
    q_type = db.Column(db.Enum(QuestionType), nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default=expression.true())
    categories = db.relationship(Category, secondary="questions_to_categories", lazy=False)

    def __repr__(self):
        return '<Question id: %r>' % self.id

    def as_dict(self):
        # {c.name: str(getattr(r, c.name)) for c in r.__table__.columns}
    
        dictionary = self.__dict__.copy()
        dictionary['q_type'] = self.q_type.value

        if (dictionary['q_type'] == QuestionType.binary.value):
            dictionary['image'] = self.image.link
            dictionary['image_category'] = self.image.category.name
            dictionary['categories_left'] = list(map(lambda x: x.category.name, filter(lambda x: x.is_left, self.questions_to_categories)))
            dictionary['categories_right'] = list(map(lambda x: x.category.name, filter(lambda x: not x.is_left, self.questions_to_categories)))
        # else:

        
        # Remove useless attributes
        dictionary.pop('_sa_instance_state')
        dictionary.pop('categories')
        dictionary.pop('questions_to_categories')
        dictionary.pop('img_id')
        return dictionary



class Question_to_Category(db.Model):

    __tablename__ = 'questions_to_categories'
    
    q_id = db.Column('question_id',  db.Integer, db.ForeignKey(Question.id), primary_key=True)
    c_id = db.Column('category_id', db.Integer, db.ForeignKey(Category.id), primary_key=True)
    is_left = db.Column('is_left', db.Boolean, nullable=False)
    question = db.relationship(Question, backref=db.backref('questions_to_categories', lazy='joined'), lazy='joined')
    category = db.relationship(Category, backref=db.backref('questions_to_categories', lazy='joined'), lazy='joined')



class QuestionChoice(db.Model):
    __tablename__ = 'question_choices'

    choice_num = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey(Question.id), primary_key=True)
    img_id = db.Column(db.Integer, db.ForeignKey(Image.id), nullable=True)
    text = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default=expression.true())

    def __repr__(self):
        return '<Question choice id: %r>' % (str(self.question_id) + str(self.choice_num))


class ParticipantAnswer(db.Model):
    __tablename__ = 'participant_answers'

    id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, db.ForeignKey(Participant.id), primary_key=True)
    question_id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.Text)
    response_time = db.Column(db.Float)


    def __repr__(self):
        return '<Answer id: %r>' % (str(self.participant_id) + str(self.question_id) + str(self.choice_num))



def populate_db():

    c = Category(name='writer', metacategory=Metacategory.profession)
    add_to_db(c)

    img = Image(category_id=c.id, link='google.com', description='description', attribute='attr')
    add_to_db(img)

    q = Question(img_id=img.id, text='teeeext', q_type=QuestionType.binary)
    add_to_db(q)
    
    q_to_c = Question_to_Category(q_id=q.id, c_id=c.id, is_left=True)

    add_to_db(q_to_c)



    

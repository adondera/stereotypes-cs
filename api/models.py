# pylint: disable=invalid-name, too-many-arguments
""" Models for the database schema."""

from flask_bcrypt import generate_password_hash
from sqlalchemy import func
from sqlalchemy.sql import expression

from api import db
import json, random, enum


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
    category_id = db.Column(db.Integer, db.ForeignKey(Category.id), nullable=True)
    link = db.Column(db.Text, nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    attribute = db.Column(db.String(40), nullable=False)

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
    information = 6

    def __repr__(self):
        # return '<QuestionType id: %r>' % self.id
        return str(self.value)


def is_jsonable(x):
    try:
        json.dumps(x)
        return True
    except:
        return False


class Question(db.Model):
    """Class that maps the Question object to the corresponding database table ('questions' table)."""

    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=True)
    q_type = db.Column(db.Enum(QuestionType), nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default=expression.true())
    to_dict = None

    categories = db.relationship(Category, secondary="questions_to_categories", lazy=False)
    choices = db.relationship('QuestionChoice', backref=db.backref('question', lazy=False), lazy=False)
    images = db.relationship(Image, secondary="questions_to_images", lazy=False)

    def __repr__(self):
        return '<Question id: %r>' % self.id

    def as_dict(self):
        if self.to_dict:
            return self.to_dict
        dictionary = self.__dict__.copy()
        dictionary['q_type'] = self.q_type.value

        if dictionary['q_type'] == QuestionType.binary.value:
            dictionary['images'] = list(map(lambda x: {"link": x.link, "category": x.category.name}, self.images))
            dictionary['categories_left'] = list(map(lambda x: {"id": x.category.id, "name": x.category.name},
                                                     filter(lambda x: x.is_left, self.questions_to_categories)))
            dictionary['categories_right'] = list(map(lambda x: {"id": x.category.id, "name": x.category.name},
                                                      filter(lambda x: not x.is_left, self.questions_to_categories)))

        elif dictionary['q_type'] == QuestionType.video.value:
            dictionary['video'] = dictionary['images'][0].link

        elif (dictionary['q_type'] == QuestionType.mc_single_answer.value
              or dictionary['q_type'] == QuestionType.mc_multiple_answer.value
              or dictionary['q_type'] == QuestionType.likert.value):
            dictionary['choices'] = sorted(
                list(map(lambda x: {"choice_num": x.choice_num, "text": x.text}, self.choices)),
                key=lambda x: x['choice_num'])
        else:
            print("Invalid question type")

        self.to_dict = dictionary
        return self.to_dict

    def make_response(self):
        if not self.to_dict:
            self.as_dict()
        response = []
        try:
            images = self.to_dict['images']
            images = [x for x in images for _ in range(2)]
            random.shuffle(images)
        except KeyError:
            images = []
        for img in images:
            new_dict = self.to_dict.copy()
            new_dict.pop('images')
            new_dict['image'] = img
            response.append(new_dict)
        if len(response) == 0:
            response = [self.to_dict]

        for dictionary in response:
            to_remove = []
            for key in dictionary:
                if not is_jsonable(dictionary[key]):
                    print(dictionary[key])
                    to_remove.append(key)

            for key in to_remove:
                dictionary.pop(key)

        return response


class Question_to_category(db.Model):
    __tablename__ = 'questions_to_categories'

    q_id = db.Column('question_id', db.Integer, db.ForeignKey(Question.id), primary_key=True)
    c_id = db.Column('category_id', db.Integer, db.ForeignKey(Category.id), primary_key=True)
    is_left = db.Column('is_left', db.Boolean, nullable=False)

    question = db.relationship(Question, backref=db.backref('questions_to_categories', lazy='joined'), lazy='joined')
    category = db.relationship(Category, backref=db.backref('questions_to_categories', lazy='joined'), lazy='joined')


class Question_to_image(db.Model):
    __tablename__ = 'questions_to_images'

    q_id = db.Column('question_id', db.Integer, db.ForeignKey(Question.id), primary_key=True)
    img_id = db.Column('category_id', db.Integer, db.ForeignKey(Image.id), primary_key=True)


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
    answers = db.Column(db.ARRAY(db.String))
    response_time = db.Column(db.Float)
    before_video = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return '<Answer id: %r>' % (str(self.participant_id) + str(self.question_id))


def populate_db():
    db.drop_all()
    db.create_all()

    ### IAT ###
    c = Category(name='writer', metacategory=Metacategory.profession)
    add_to_db(c)

    img = Image(category_id=c.id, link='google.com', description='description', attribute='attr')
    add_to_db(img)

    q = Question(text='teeeext', q_type=QuestionType.binary, images=[img])
    add_to_db(q)

    q_to_c = Question_to_category(q_id=q.id, c_id=c.id, is_left=True)

    add_to_db(q_to_c)

    eat = Question(text="How big yo mamma's reaction time", q_type=QuestionType.mc_multiple_answer)
    add_to_db(eat)
    choice1 = QuestionChoice(choice_num=1, question=eat, text="so fast")
    choice2 = QuestionChoice(choice_num=2, question=eat, text="not so fast")
    add_to_db(choice1)
    add_to_db(choice2)

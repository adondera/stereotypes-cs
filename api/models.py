# pylint: disable=invalid-name, too-many-arguments, too-few-public-methods, no-member, dangerous-default-value
""" Module that contains the models for the database
    (classes that will be mapped to the database schema)."""

import json
import random
import enum

from flask_bcrypt import generate_password_hash
from sqlalchemy import func
from sqlalchemy.sql import expression

from api import db


def add_to_db(obj):
    """
    Helper method to add an object in the database.

    Parameters
    ----------
    obj : object type from models.py
        The object to be inserted into the database.

    Raises
    ------
    SQLException
        If failed to add a new user to the database. Transaction is rolled back.

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


def is_jsonable(x):
    """
    Checks if x is JSONable (can be converted to JSON object).

    Parameters
    ----------
    x : any
        The object/data-type we want to know if it is JSONable.

    Returns
    -----
    boolean
        True if x is JSONable, or False if it is not.

    """
    try:
        json.dumps(x)
        return True
    except TypeError:
        return False


class User(db.Model):
    """
    Class that maps the User object to the corresponding database table ('users' table).

    Attributes
    ----------
    id : int, optional
        Auto-generated id for the User object.

    username : str
        The username credential.

    password : str
        The password credential.

    Methods
    -------
    create_user(username, password)
        Creates a new user and adds it to the database.

    """

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

    @staticmethod
    def create_user(username, password):
        """
        Method to create a new user instance in the database.

        Parameters
        ----------
        username : str
            User's username.
        password : str
            User's password.

        Returns
        -------
        user : User
            The user object that was created.

        """

        hashed_pw = generate_password_hash(password).decode('utf-8')
        user = User(username=username, password=hashed_pw)
        add_to_db(user)
        return user

    def __repr__(self):
        """The string representation of the object."""
        return '<User %r>' % self.username


class Consent(db.Model):
    """
    Class that maps the Consent object to the corresponding database table ('consents' table).

    Attributes
    ----------
    id : int , optional
        Auto-generated object id.
    parent_first_name : str
        The first name of the parent that signs the consent.
    parent_last_name : str
        The last name of the parent that signs the consent.
    parent_email : str
        The email of the parent
    signature : str (link)
        Parent's signature (in the form of a link to the image location stored in the cloud).

    Methods
    -------
    create_consent(parent_first_name, parent_last_name, signature)
        Method that creates a new consent object and adds into the database.

    """

    __tablename__ = 'consent'

    id = db.Column(db.Integer, primary_key=True)
    parent_first_name = db.Column(db.String(40), nullable=False)
    parent_last_name = db.Column(db.String(40), nullable=False)
    parent_email = db.Column(db.String(120), nullable=True)
    signature = db.Column(db.Text(), nullable=False)

    @staticmethod
    def create_consent(parent_first_name, parent_last_name, signature):
        """
        Creates a new consent form entry in the database.

        Parameters
        ----------
        parent_first_name : str
            Parent's first name.
        parent_last_name : str
            Parent's last name.
        signature : str (link)
            Parent's signature.

        Returns
        -------
        consent : Consent
            The consent object that was created.

        """

        consent = Consent(parent_first_name=parent_first_name,
                          parent_last_name=parent_last_name,
                          signature=signature)
        add_to_db(consent)
        return consent

    def __repr__(self):
        """The string representation of the object."""
        return '<Consent form id: %r>' % self.id


class Gender(enum.Enum):
    """Enumeration of the choices for gender types"""

    Jongen = "Jongen"
    Meisje = "Meisje"
    Niet = "Zeg ik liever niet"


class Ethnicity(enum.Enum):
    """Enumeration of the choices for ethnicity types"""

    Nederlands = "Nederlands"
    Turks = "Turks"
    Marokkaans = "Marokkaans"
    Surinaams = "Surinaams"
    Indonesisch = "Indonesisch"
    Duits = "Duits"
    Pools = "Pools"
    Anders = "Anders"


class Version(enum.Enum):
    """Enumeration of the different scenarios"""
    Dummy = "gender-profession.json"


class Participant(db.Model):
    """
    Class that maps the Participant object to
     the corresponding database table ('participants' table).

    Attributes
    ----------
    id : int , optional
        Auto-generated object id.
    consent_id : int
        Id of the consent form signed by participant's parent.
    first_name : str
        Participant's first name.
    last_name : str
        Participant's last name.
    age : int (6 - 18)
        The age of the participant.
    gender : Gender
        The gender of the participant.
    ethnicity : list of Ethnicity
        The ethnicity/ethnicities of the participant. (multiple options possible)
    researcher_notes : Text
        Notes the researchers may add about the participant
    quiz_version : Enum
        Which quiz version the participant has taken
    date : datetime (current date)
        The date at which the participant takes the test.

    """

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
    researcher_notes = db.Column(db.Text(), nullable=True)
    quiz_version = db.Column(db.Enum(Version), nullable=True)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    answers = db.relationship("ParticipantAnswer", backref=db.backref('participant'), lazy=True)

    def __repr__(self):
        """The string representation of the object."""
        return '<Participant id: %r>' % self.id


class Metacategory(enum.Enum):
    """Enumeration of the choices for metacategories"""

    profession = "Profession"
    gender = "Gender"
    hobby = "Hobby"
    social = "Social"


class Category(db.Model):
    """
    Class that maps the Category object to
     the corresponding database table ('categories' table).

    Attributes
    ----------
    id : int , optional
        Auto-generated object id.
    name : str
        Category name.
    metacategory : Metacategory
        The metacategory of the category. (Ex: male (category) and gender (metacategory))
    questions : list of Question
        The list of questions in which this category is used.
    images : list of Image
        The list of images that belong to this category.

    Methods
    -------
    create_category(name, metacategory)
        Creates a new category and adds it into the database.

    """

    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    metacategory = db.Column(db.Enum(Metacategory), nullable=False)
    questions = db.relationship("Question", secondary="questions_to_categories", lazy=True)
    images = db.relationship("Image", backref=db.backref('category'), lazy=True)

    @staticmethod
    def create_category(name, metacategory):
        """
        Creates a category object and inserts it into the database

        Parameters
        ----------
        name : str
            Category's name.
        metacategory : Metacategory
            The metacategory this category belongs to.

        Returns
        -------
        cat : Category
            The category object that was created.

        """

        cat = Category(name=name, metacategory=metacategory)
        add_to_db(cat)
        return cat

    def __repr__(self):
        """The string representation of the object."""
        return '<Category id: %r>' % self.id


class Image(db.Model):
    """
    Class that maps the Image object to
     the corresponding database table ('images' table).

    Attributes
    ----------
    id : int , optional
        Auto-generated object id.
    category_id : int
        The id of the category that this image belongs to.
    link : str
        The link to the location where the image is stored in the cloud.
    description : str
        A short description of the image.
    attribute : str
        The attribute describing the image. (Ex: pen)

    Methods
    -------
    create_image(link, description="", attribute="", c_id=None)
        Method that creates a new image and adds it into the database.

    """

    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey(Category.id), nullable=True)
    link = db.Column(db.Text, nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    attribute = db.Column(db.String(40), nullable=False)

    @staticmethod
    def create_image(link, description="", attribute="", c_id=None):
        """
        Creates an image object and inserts it into the database

        Parameters
        ----------
        link : str
            Link to the image location.
        description : str , optional
            A short description of the image.
        attribute : str , optional
            The attribute describing the image.
        c_id : int , optional
            The category that the images belongs to. (can be assigned at a later time)

        Returns
        -------
        img : Image
            The image object that was created.

        """

        img = Image(category_id=c_id, link=link, description=description, attribute=attribute)
        add_to_db(img)
        return img

    def __repr__(self):
        """The string representation of the object."""
        return str(self.link)


class QuestionType(enum.Enum):
    """Enumeration of the choices for question types"""

    mc_single_answer = "mc_single_answer"
    mc_multiple_answer = "mc_multiple_answer"
    likert = "likert"
    binary = "binary"
    video = "video"
    information = "information"
    likert_demographics = "likert_demographics"
    finish = "finish"
    open_question = "open_question"
    notes = "researcher_notes"

    def __repr__(self):
        """The string representation of the object."""
        return str(self.value)


class ParticipantInformationType(enum.Enum):
    age = "Age"
    gender = "Gender"
    ethnicity = "Ethnicity"
    researcher_notes = "Researcher notes"


class Question(db.Model):
    """
    Class that maps the Question object to
     the corresponding database table ('questions' table).

    Attributes
    ----------
    id : int , optional
        Auto-generated object id.
    text : str
        The text of the question.
    q_type : QuestionType
        The type of the question.
    is_active : boolean , default=True
        Specifies if the question can be used in the test.
    to_dict : dictionary
        The object represented as a dictionary.
    categories : list of Category
        The list of categories that belong to this question (for IAT questions)
    choices : list of QuestionChoice
        The list of choices that this question has.
    images : list of Image
        The list of images that this question uses.

    Methods
    -------
    create_question(q_type, is_active=True, text="", categories=[], choices=[], images=[])
        Creates a new question object and adds it into the database.
    as_dict()
        Returns a dictionary representation of the object (with a selection of attributes).
    make_response()
        Generate a JSON response from this object that will be send to the client side.

    """

    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=True)
    q_type = db.Column(db.Enum(QuestionType), nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default=expression.true())
    information = db.Column(db.Enum(ParticipantInformationType), nullable=True)
    to_dict = None

    categories = db.relationship(Category, secondary="questions_to_categories", lazy=True)
    choices = db.relationship('QuestionChoice',
                              backref=db.backref('question', lazy=True),
                              lazy=True)
    images = db.relationship(Image, secondary="questions_to_images", lazy=True)

    @staticmethod
    def create_question(q_type, is_active=True, text="", information=None,
                        categories=[], choices=[], images=[]):
        """
        Creates a question object and inserts it into the database

        Parameters
        ----------
        q_type : QuestionType
            The type of the question.
        is_active : boolean, default=True
            Specifies if the question can be used in the quiz.
        text : str , default=""
            The text of the question
        categories = list of Category, optional
            The categories that belong to this question.
        choices = list of QuestionChoice , optional
            The choices that this question has.
        images = list of Image , optional
            The images that this question uses.

        Returns
        -------
        q : Question
            The question object that was created.

        """

        q = Question(q_type=q_type, is_active=is_active, text=text, information=information,
                     categories=categories, choices=choices, images=images)
        add_to_db(q)
        return q

    def as_dict(self):
        """
        Creates a dictionary based on current instance and question type.
        (only if it was not already created)

        Returns
        -------
        dictionary
            A simplified dictionary representation of the object.
            The dictionary is stored in a variable for later use.

        """

        if self.to_dict:
            return self.to_dict
        dictionary = self.__dict__.copy()
        dictionary['q_type'] = self.q_type.value

        if dictionary['q_type'] == QuestionType.binary.value:
            dictionary['images'] = list(
                map(
                    lambda x: {"link": x.link, "category": x.category.name}, self.images
                )
            )
            dictionary['categories_left'] = list(
                map(
                    lambda x: {"id": x.category.id, "name": x.category.name},
                    filter(lambda x: x.is_left, self.questions_to_categories)
                )
            )
            dictionary['categories_right'] = list(
                map(
                    lambda x: {"id": x.category.id, "name": x.category.name},
                    filter(lambda x: not x.is_left, self.questions_to_categories)
                )
            )

        elif dictionary['q_type'] == QuestionType.video.value:
            dictionary['video'] = dictionary['images'][0].link
            dictionary.pop('images')

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
        """
        1)Shuffles images (for IAT questions).
        2)Flattens 'images' attribute (creates a separate question for each image).
          This is required by the structure of the client-side application.
        3)Removes unnecessary attributes

        Returns
        -------
        dictionary
            A JSON object that will be send from the server to the client.

        """

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
                    to_remove.append(key)

            for key in to_remove:
                dictionary.pop(key)

        return response

    def __repr__(self):
        """The string representation of the object."""
        return '<Question id: %r>' % self.id


class Question_to_category(db.Model):
    """
    Association Class that connects questions with their categories and stores their position.

    Attributes
    ----------
    q_id : int
        The question id.
    c_id : int
        The id of the category that belongs to the question.
    is_left : boolean
        Specifies the position of the category within the IAT question
        (left if True, or right if False).
    question : Question
        The question object.
    category : Category
        The category object.

    """
    __tablename__ = 'questions_to_categories'

    q_id = db.Column('question_id', db.Integer, db.ForeignKey(Question.id), primary_key=True)
    c_id = db.Column('category_id', db.Integer, db.ForeignKey(Category.id), primary_key=True)
    is_left = db.Column('is_left', db.Boolean, nullable=False)

    question = db.relationship(Question,
                               backref=db.backref('questions_to_categories', lazy=True),
                               lazy=True)
    category = db.relationship(Category,
                               backref=db.backref('questions_to_categories', lazy=True),
                               lazy=True)


class Question_to_image(db.Model):
    """
    Association Class that connects Questions objects with their images.

    Attributes
    ----------
    q_id : int
        Question id.
    img_id : int
        The id of the image that is used in the question.

    """
    __tablename__ = 'questions_to_images'

    q_id = db.Column('question_id', db.Integer, db.ForeignKey(Question.id), primary_key=True)
    img_id = db.Column('img_id', db.Integer, db.ForeignKey(Image.id), primary_key=True)


class QuestionChoice(db.Model):
    """
    Class that maps the QuestionChoice object to
     the corresponding database table ('question_choices' table).

    Attributes
    ----------
    choice_num : int
        The choice number within a question.
    question_id : int
        The id of the question that this choice belongs to.
    img_id : int , optional
        The id of the image that this choice is using.
    text : str
        The text of the question choice.
    is_active : boolean
        Specifies if this choice will be used in the question.

    Methods
    -------
    create_choice(choice_num, q_id, text, img_id, is_active)
        Creates a new question choice and adds it into the database.

    """

    __tablename__ = 'question_choices'
    choice_num = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey(Question.id), primary_key=True)
    img_id = db.Column(db.Integer, db.ForeignKey(Image.id), nullable=True)
    text = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default=expression.true())

    @staticmethod
    def create_choice(choice_num, q_id, text, img_id=None, is_active=True):
        """
        Creates a QuestionChoice object and inserts it into the database

        Parameters
        ----------
        choice_num : int
            The choice number within the question.
        q_id : int
            The id of the question this choice belongs to.
        text : str
            The text of the choice.
        img_id : int , optional
            The image included in this choice
        is_active : boolean (default=True), optional
            Specifies if this choice should be used within the question.

        Returns
        -------
        choice : QuestionChoice
            The object that was created.
        """

        choice = QuestionChoice(choice_num=choice_num, question_id=q_id,
                                img_id=img_id, text=text, is_active=is_active)
        add_to_db(choice)
        return choice

    def __repr__(self):
        """The string representation of the object."""
        return '<Question choice id: %r>' % (str(self.question_id) + str(self.choice_num))


class ParticipantAnswer(db.Model):
    """
    Class that maps the ParticipantAnswer object to
     the corresponding database table ('participant_answers' table).

    Attributes
    ----------
    id : int , optional
        Auto-generated object id.
    participant_id : int
        The id of the participant the answer belongs to.
    question_id : int
        The id of the question this answer belongs to.
    img_link : str , optional
        The link to the image location in the cloud. (if the answer contains one)
    answers : list of int
        The list with the answers given. It varies based on the question type.
        For IAT questions: an integer representing the number of wrong tries
        For Likert questions: an integer from 1 to 5 (1: strongly agree -> 5: strongly disagree).
        For multiple choice questions: the number of the choice that was chosen (choice_num).
    open_answer : Text
        An optional field for questions where you can give your own answer in a text box
    response_time : int , optional
        The response time for the question in ms.
    before_video : boolean
        Specifies if the answer was given before or after the video intervention.

    """

    __tablename__ = 'participant_answers'

    id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, db.ForeignKey(Participant.id), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(Question.id), nullable=False)
    img_link = db.Column(db.Text, db.ForeignKey(Image.link), nullable=True)
    answers = db.Column(db.Integer, nullable=True)
    open_question_answer = db.Column(db.Text, nullable=True)
    response_time = db.Column(db.Integer, nullable=True)
    before_video = db.Column(db.Boolean, nullable=False)

    question = db.relationship("Question", backref=db.backref('answers'))

    def __repr__(self):
        """The string representation of the object."""
        return '<Answer id: %r>' % (str(self.participant_id) + str(self.question_id))

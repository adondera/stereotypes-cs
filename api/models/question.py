import random
from sqlalchemy.sql import expression

from .helpers import db, add_to_db, is_jsonable
from .enums import QuestionType, ParticipantInformationType
from .image import Image
from .category import Category


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
    is_active = db.Column(db.Boolean, default=True,
                          server_default=expression.true())
    information = db.Column(db.Enum(ParticipantInformationType), nullable=True)
    to_dict = None

    categories = db.relationship(
        Category, secondary="questions_to_categories", lazy=True)
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
                    lambda x: {"link": x.link,
                               "category": x.category.name}, self.images
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
                    filter(lambda x: not x.is_left,
                           self.questions_to_categories)
                )
            )

        elif dictionary['q_type'] == QuestionType.video.value:
            print(self.images)
            dictionary['video'] = dictionary['images'][0].link
            dictionary.pop('images')

        elif (dictionary['q_type'] == QuestionType.mc_single_answer.value
              or dictionary['q_type'] == QuestionType.mc_multiple_answer.value
              or dictionary['q_type'] == QuestionType.likert.value):
            dictionary['choices'] = sorted(
                list(
                    map(lambda x: {"choice_num": x.choice_num, "text": x.text}, self.choices)),
                key=lambda x: x['choice_num'])
        else:
            print("Invalid question type")

        self.to_dict = dictionary
        return self.to_dict

    def shuffle_images(self, seed=None):
        """
        Shuffles the images in a IAT block, making sure that no image appears consecutively.

        Parameters
        ----------
        seed : int
            If supplied, provides the seed for the random number generator.
            Added for testing purposes, defaults to None.
        Returns
        -------
        images : List of Image
            The created and shuffled list of images
        """

        random.seed(seed)

        images = self.to_dict['images']

        images1 = list(random.sample(images, k=len(images)))
        images2 = list(random.sample(images, k=len(images)))

        if images1[-1]['link'] == images2[0]['link']:
            new_index = random.randrange(1, len(images2))
            try:
                images2[0], images2[new_index] = images2[new_index], images2[0]
            except IndexError:
                return images

        images1.extend(images2)

        return images1

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
            images = self.shuffle_images()
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

    q_id = db.Column('question_id', db.Integer,
                     db.ForeignKey(Question.id), primary_key=True)
    c_id = db.Column('category_id', db.Integer,
                     db.ForeignKey(Category.id), primary_key=True)
    is_left = db.Column('is_left', db.Boolean, nullable=False)

    question = db.relationship(Question,
                               backref=db.backref(
                                   'questions_to_categories', lazy=True),
                               lazy=True)
    category = db.relationship(Category,
                               backref=db.backref(
                                   'questions_to_categories', lazy=True),
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

    q_id = db.Column('question_id', db.Integer,
                     db.ForeignKey(Question.id), primary_key=True)
    img_id = db.Column('img_id', db.Integer,
                       db.ForeignKey(Image.id), primary_key=True)

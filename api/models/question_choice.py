# pylint: disable=invalid-name, too-many-arguments, too-few-public-methods, no-member, dangerous-default-value
"""
Module that contains the QuestionChoice object from the database
"""
from sqlalchemy.sql import expression
from .helpers import db, add_to_db
from .question import Question
from .image import Image


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
    question_id = db.Column(db.Integer, db.ForeignKey(
        Question.id), primary_key=True)
    img_id = db.Column(db.Integer, db.ForeignKey(Image.id), nullable=True)
    text = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True,
                          server_default=expression.true())

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

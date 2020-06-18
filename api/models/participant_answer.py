from .helpers import db, add_to_db
from .question import Question
from .image import Image
from .participant import Participant


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
        For Likert questions: an integer from 1 to 7 (1: strongly disagree -> 7: strongly agree).
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
    participant_id = db.Column(
        db.Integer, db.ForeignKey(Participant.id), nullable=False)
    question_id = db.Column(
        db.Integer, db.ForeignKey(Question.id), nullable=False)
    img_link = db.Column(db.Text, db.ForeignKey(Image.link), nullable=True)
    answers = db.Column(db.Integer, nullable=True)
    open_question_answer = db.Column(db.Text, nullable=True)
    response_time = db.Column(db.Integer, nullable=True)
    before_video = db.Column(db.Boolean, nullable=False)

    question = db.relationship("Question", backref=db.backref('answers'))

    @staticmethod
    def create_participant_answer(p_id, q_id, img_link=None, answers=None, open_answer=None, r_time=None,
                                  before_video=False):
        p_answer = ParticipantAnswer(participant_id=p_id, question_id=q_id, img_link=img_link,
                                     answers=answers, open_question_answer=open_answer,
                                     response_time=r_time, before_video=before_video)
        add_to_db(p_answer)

    def __repr__(self):
        """The string representation of the object."""
        return '<Answer id: %r>' % (str(self.participant_id) + str(self.question_id))

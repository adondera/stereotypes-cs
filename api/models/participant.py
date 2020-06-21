# pylint: disable=invalid-name, too-many-arguments, too-few-public-methods, no-member, dangerous-default-value
"""
Module that contains the participant object from the database
"""
from sqlalchemy import func
from .helpers import db, add_to_db
from .consent import Consent
from .enums import Version


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
    consent_id = db.Column(
        db.Integer, db.ForeignKey(Consent.id), nullable=False)
    first_name = db.Column(db.String(40), nullable=True)
    last_name = db.Column(db.String(40), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(40), nullable=True)
    ethnicity = db.Column(db.ARRAY(db.String(40)), nullable=True)
    researcher_notes = db.Column(db.Text(), nullable=True)
    quiz_version = db.Column(db.Enum(Version), nullable=True)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    answers = db.relationship(
        "ParticipantAnswer", backref=db.backref('participant'), lazy=True)

    answers = db.relationship("ParticipantAnswer", backref=db.backref('participant'), lazy=True)

    @staticmethod
    def create_participant(consent_id, first_name="", last_name="", age=None, gender=None,
                           ethnicity=[], researcher_notes="", quiz_version=None):
        """
        Creates a new participant and adds it in the database.

        Parameters
        ----------
        consent_id : int
            Id of the consent signed by participant's parent.
        first_name : str
            Participant's first name.
        last_name : str
            Participant's last name.
        age : int
            Participant's age.
        gender : str
            Participant's gender.
        ethnicity : list of str
            Participant's ethnicities.
        researcher_notes : str
            Researcher's notes on participant.
        quiz_version : Version
            The version of the quiz the participant has taken.

        Returns
        -------
        participant : Participant
            The participant object that was created.

        """

        participant = Participant(consent_id=consent_id,
                                  first_name=first_name,
                                  last_name=last_name,
                                  age=age,
                                  gender=gender,
                                  ethnicity=ethnicity,
                                  researcher_notes=researcher_notes,
                                  quiz_version=quiz_version)
        add_to_db(participant)
        return participant

    def __repr__(self):
        """The string representation of the object."""
        return '<Participant id: %r>' % self.id

""" This class declares fixtures for pytest """
import os
import pytest
from api import app, db
from api.models import User, Consent, Participant, Version, Gender, Ethnicity, Question
from api.endpoints.sockets import red
from api.script import populate
from api.endpoints.quiz_factory import QuizFactory


@pytest.fixture
def rootdir():
    """
    Returns the absolute path to the test directory
    Used for file parsing
    """
    return os.path.dirname(os.path.abspath(__file__))


@pytest.fixture
def client():
    """
    Creates a test client and an app context for running the tests.
    Removes the context after testing is finished.
    """
    testing_client = app.test_client()
    context = app.app_context()
    context.push()
    yield testing_client
    context.pop()


@pytest.fixture
def init_db():
    """
    Initialises a local test db and removes it after testing is finished.
    """
    db.drop_all()
    db.create_all()
    User.create_user("username", "password")
    yield db
    db.session.close()
    db.drop_all()
    red.flushall()


@pytest.fixture
def init_db_with_participants():
    """
    Initialises a local test db and removes it after testing is finished.
    """
    db.drop_all()
    db.create_all()
    User.create_user("username", "password")
    Consent.create_consent("John", "Doe", "Signature")
    Participant.create_participant(1, "Ionut", "Cons", 15, Gender.Jongen.value, [Ethnicity.Nederlands.value], "",
                                   Version.A)
    yield db
    db.session.close()
    db.drop_all()


@pytest.fixture
def make_quiz():
    """
    Populates the database and creates a gender-profession IAT
    """
    db.drop_all()
    populate()
    root = os.path.dirname(os.path.abspath(__file__))
    test_file = os.path.join(root, 'test_files/intervention-hobby-female.json')
    QuizFactory(test_file).create_collection_quiz()
    question_3 = Question.query.filter_by(id=24).first()
    question_5 = Question.query.filter_by(id=26).first()
    yield question_3, question_5
    db.session.close()
    db.drop_all()

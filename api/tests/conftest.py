""" This class declares fixtures for pytest """
import os
import pytest
from api import app, db
from api.models import User, Consent, Participant, Version, Gender, Ethnicity
from api.endpoints.sockets import red

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
    Participant.create_participant(1, "Ionut", "Cons", 15, Gender.Jongen.value, [Ethnicity.Nederlands.value], "", Version.Dummy)
    yield db
    db.session.close()
    db.drop_all()


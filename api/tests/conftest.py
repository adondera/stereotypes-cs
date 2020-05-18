""" This class declares fixtures for pytest """
import pytest
from api import app, db
from api.models import User


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
    db.create_all()
    User.create_user("username", "password")
    yield db
    db.session.close()
    db.drop_all()

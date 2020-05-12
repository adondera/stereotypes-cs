import pytest
from api import app, db
from api.models import User


@pytest.fixture
def client():
    testing_client = app.test_client()
    context = app.app_context()
    context.push()
    yield testing_client
    context.pop()


@pytest.fixture
def init_db():
    db.create_all()
    User.create_user("alin", "bandera")
    yield db
    db.session.close()
    db.drop_all()

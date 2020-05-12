from api.models import User
from api import bcrypt
from sqlalchemy.exc import IntegrityError
import unittest
import pytest


@pytest.mark.usefixtures("init_db")
class TestUserModel(unittest.TestCase):
    def test_create_existing_user(self):
        self.assertRaises(IntegrityError, User.create_user, 'username', 'password')


def test_constructor():
    user = User("test", "test")
    assert user.username == 'test'
    assert user.password == 'test'


def test_create_user(init_db):
    User.create_user('test', 'test')
    user = User.query.filter_by(username='test').first()
    assert user is not None
    assert user.id == 2
    assert user.username == 'test'
    assert bcrypt.check_password_hash(user.password, 'test')

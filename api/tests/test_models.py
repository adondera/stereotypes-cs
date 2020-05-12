"""Tests for database models."""
import unittest
import pytest
from sqlalchemy.exc import IntegrityError
from api.models import User
from api import bcrypt


@pytest.mark.usefixtures("init_db")
class TestUserModel(unittest.TestCase):
    """Class that contains tests for User model."""
    def test_create_existing_user(self):
        self.assertRaises(IntegrityError, User.create_user, 'username', 'password')


def test_constructor():
    """Test User class constructor."""
    user = User("test", "test")
    assert user.username == 'test'
    assert user.password == 'test'


def test_create_user(init_db):
    """Test creation of a new user instance in the database."""
    User.create_user('test', 'test')
    user = User.query.filter_by(username='test').first()
    assert user is not None
    assert user.id == 2
    assert user.username == 'test'
    assert bcrypt.check_password_hash(user.password, 'test')

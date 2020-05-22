"""Tests for database models."""
import unittest
import pytest
from sqlalchemy.exc import IntegrityError
from api.models import User, Consent
from api import bcrypt


@pytest.mark.usefixtures("init_db")
class TestUserModel(unittest.TestCase):
    """Class that contains tests for User model."""
    def test_create_existing_user(self):
        """ Asserts if IntegrityError is raised when creating a user"""
        self.assertRaises(IntegrityError, User.create_user, 'username', 'password')


def test_constructor():
    """Test User class constructor."""
    user = User(username="test", password="test")
    assert user.username == 'test'
    assert user.password == 'test'


def test_create_user(init_db):
    # pylint: disable=unused-argument
    # init_db fixture is run automatically, therefore we need it
    """Test creation of a new user instance in the database."""
    User.create_user(username='test', password='test')
    user = User.query.filter_by(username='test').first()
    assert user is not None
    assert user.id == 2
    assert user.username == 'test'
    assert bcrypt.check_password_hash(user.password, 'test')


def test_create_form_result(init_db):
    # pylint: disable=unused-argument
    Consent.create_consent(parent_first_name='alin', parent_last_name='bandera', signature='signature')
    result = Consent.query.filter_by(parent_first_name='alin').first()
    assert result.parent_first_name == 'alin'

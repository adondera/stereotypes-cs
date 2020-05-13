"""Tests for validation module."""
import api.validation as valid

def test_validate_none():
    """
    Test None type for both validators and data
    :return:
    """
    validators = None
    data = None
    assert valid.validate(data, validators) is None

def test_validate_missingkey():
    """
    Test validate incoming data containing fewer keys than expected
    :return:
    """
    validators = {
        'username': valid.validate_string,
        'password': valid.validate_string
    }
    data = {
        'username': 'user'
    }

    res = valid.validate(data, validators)
    assert res['password'] is None

def test_keynotinvalidators():
    """
    Test validate incoming data containing more keys than expected
    :return:
    """
    validators = {
        'year': valid.validate_int,
    }
    data = {
        'year': 2020,
        'month': 'May'
    }
    res = valid.validate(data, validators)
    assert 'month' not in res


def test_mismatch():
    """
    Test validate incoming data containing a different type of value than expected
    :return:
    """
    validators = {
        'year': valid.validate_int,
    }
    data = {
        'year': '2020'
    }
    res = valid.validate(data, validators)
    assert res is None

def test_validators():
    """
    Test validate accept, boolean, float, email, list types
    :return:
    """
    validators = {
        'accept': valid.validate_accept,
        'boolean': valid.validate_boolean,
        'float': valid.validate_float,
        'email': valid.validate_email,
        'list': valid.validate_list
    }
    anytype = any
    data = {
        'accept': anytype,
        'boolean': True,
        'float': 1.12,
        'email': "test@test.com",
        'list': [1, 2, 3, 4]
    }
    res = valid.validate(data, validators)
    assert res == data

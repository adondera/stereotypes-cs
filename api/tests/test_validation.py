"""Tests for validation module."""
import api.validation as valid

def test_validate_none():
    validators = None
    data = None
    assert valid.validate(data, validators) is None

def test_validate_missingkey():
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
    validators = {
        'year': valid.validate_int,
    }
    data = {
        'year': '2020'
    }
    res = valid.validate(data, validators)
    assert res is None

def test_validators():
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

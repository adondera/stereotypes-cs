from api.validation import *

def test_validate_none():
    validators = None
    data = None
    assert validate(data, validators) == None

def test_validate_missingkey():
    validators = {
        'username': validate_string,
        'password': validate_string
    }
    data = {
        'username': 'user'
    }
    
    res = validate(data, validators)
    assert res['password'] == None

def test_keynotinvalidators():
    validators = {
        'year': validate_int,
    }
    data = {
        'year': 2020,
        'month': 'May'
    }
    res = validate(data, validators)
    assert 'month' not in res


def test_mismatch():
    validators = {
        'year': validate_int,
    }
    data = {
        'year': '2020'
    }
    res = validate(data, validators)
    assert res == None

def test_validators():
    validators = {
        'accept': validate_accept,
        'boolean': validate_boolean,
        'float': validate_float,
        'email': validate_email,
        'list': validate_list
    }
    anytype = any
    data = {
        'accept': anytype,
        'boolean': True,
        'float': 1.12,
        'email': "test@test.com",
        'list': [1, 2, 3, 4]
    }
    res = validate(data, validators)
    assert res == data
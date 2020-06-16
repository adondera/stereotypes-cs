# pylint: disable=unused-argument
"""Test module for requests to different routes"""
from flask_jwt_extended import create_access_token, decode_token


def test_get_root(client):
    """
    Test for a basic request for the / route
    Server should return status code 200 and the text Hello, World!
    :param client: The testing client provided by flask
    :return: Nothing
    """
    assert client.get("/").status_code == 200
    assert client.get("/").data == b"Hello, World!"


def test_get_login(client, init_db):
    """
    Test for a post request for the /login endpoint with a registered user
    Authentication should be successful. Server should return access and refresh token
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    assert "access_token" in response.get_json()
    assert "refresh_token" in response.get_json()


def test_get_login_no_password_provided(client, init_db):
    """
    Test for a post request for /login
    No password provided. Should result in a bad request response
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(username='username'))
    assert response.status_code == 400


def test_get_login_no_username_provided(client, init_db):
    """
    Test for a post request for /login
    No username provided. Should result in a bad request response
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(password='password'))
    assert response.status_code == 400


def test_get_login_bad_combination(client, init_db):
    """
    Test for a post request for /login
    Bad combination of username password. Should result in a forbidden request response
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(username='username', password='randomWrong'))
    assert response.status_code == 403


def test_get_null_username(client, init_db):
    """
    Test for a post request for /login
    Username is null. Should result in a bad request response
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(username=None, password='password'))
    assert response.status_code == 400


def test_protected_fresh(client, init_db):
    """
    Test for a post request for /protected-fresh with an acquired fresh token
    Should result in a OK response
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['access_token']
    response = client.get("/protected-fresh", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert response.get_json()['fresh_logged_in_as'] == 'username'


def test_protected_with_nonfresh_token(client, init_db):
    """
    Test for a post request for /protected with a non fresh token.
    Should still results in a OK response.
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['refresh_token']
    response = client.post("/refresh", headers={'Authorization': 'Bearer ' + token})

    token = response.get_json()['access_token']
    response = client.get("/protected", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert 'logged_in_as' in response.get_json()


def test_create_nonfresh_token(client, init_db):
    """
    Test for a post request for /protected-fresh with a non fresh token
    Should results in a Unauthorized(401) response
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    token = create_access_token(identity='username', fresh=False)
    response = client.get("/protected-fresh", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 401


def test_access_with_refresh_token(client, init_db):
    """
    Test for a post request for /refresh with a refresh token
    Should result in a OK response. Response should contain a new token
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['refresh_token']
    response = client.post("/refresh", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert 'access_token' in response.get_json()


def test_protected_with_refresh_token(client, init_db):
    """
    Test for a post request for /protected with no access token, but with a refresh token
    Should result in a 422 response
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['refresh_token']
    response = client.get("/protected", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 422


def test_refresh_with_access_token(client, init_db):
    """
    Test for a post request for /refresh with no refresh token, but with a access token
    Should result in a 422 response
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['access_token']
    response = client.post("/refresh", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 422


def test_fresh_login(client, init_db):
    """
    Test for a post request for /fresh-login with a refresh token
    Should result in a 200 response. Response should contain new fresh access token.
    :param client: The testing client provided by flask
    :param init_db: Database fixture for initialization
    :return: Nothing
    """
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['refresh_token']
    response = client.post("/fresh-login", data=dict(username='username', password='password'),
                           headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert 'access_token' in response.get_json()
    token = response.get_json()['access_token']
    assert decode_token(token)['fresh']

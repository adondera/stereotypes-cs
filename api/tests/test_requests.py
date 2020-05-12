# pylint: disable=unused-argument
from flask_jwt_extended import create_access_token, decode_token


def test_get_root(client):
    assert client.get("/").status_code == 200
    assert client.get("/").data == b"Hello, World!"


def test_get_login(client, init_db):
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    assert "access_token" in response.get_json()
    assert "refresh_token" in response.get_json()


def test_get_login_no_password_provided(client, init_db):
    response = client.post("/login", data=dict(username='username'))
    assert response.status_code == 400


def test_get_login_no_username_provided(client, init_db):
    response = client.post("/login", data=dict(password='password'))
    assert response.status_code == 400


def test_get_login_bad_combination(client, init_db):
    response = client.post("/login", data=dict(username='username', password='randomWrong'))
    assert response.status_code == 403


def test_get_null_username(client, init_db):
    response = client.post("/login", data=dict(username=None, password='password'))
    assert response.status_code == 400


def test_protected_fresh(client, init_db):
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['access_token']
    response = client.get("/protected-fresh", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert response.get_json()['fresh_logged_in_as'] == 'username'


def test_protected_with_nonfresh_token(client, init_db):
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['refresh_token']
    response = client.post("/refresh", headers={'Authorization': 'Bearer ' + token})

    token = response.get_json()['access_token']
    response = client.get("/protected", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert response.get_json()['logged_in_as'] == 'username'


def test_create_nonfresh_token(client, init_db):
    token = create_access_token(identity='username', fresh=False)
    response = client.get("/protected-fresh", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 401


def test_access_with_refresh_token(client, init_db):
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['refresh_token']
    response = client.post("/refresh", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert 'access_token' in response.get_json()


def test_protected_with_refresh_token(client, init_db):
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['refresh_token']
    response = client.get("/protected", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 422


def test_refresh_with_access_token(client, init_db):
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['access_token']
    response = client.post("/refresh", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 422


def test_fresh_login(client, init_db):
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['refresh_token']
    response = client.post("/fresh-login", data=dict(username='username', password='password'),
                headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert 'access_token' in response.get_json()
    token = response.get_json()['access_token']
    assert decode_token(token)['fresh'] == True
    
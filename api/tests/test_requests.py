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

def test_get_root(client):
    assert client.get("/").status_code == 200
    assert client.get("/").data == b"Hello, World!"


def test_get_login(client, init_db):
    response = client.post("/login", data=dict(username='alin', password='bandera'))
    print(response.get_json())
    assert response.status_code == 200
    assert "access_token" in response.get_json()
    assert "refresh_token" in response.get_json()

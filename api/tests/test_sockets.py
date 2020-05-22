from api import app, socketio

def test_connection(client, init_db):
    response = client.post("/login", data=dict(username='username', password='password'))
    token = response.get_json()['access_token']
    socket_io_test_client = socketio.test_client(app, headers={'Authorization': 'Bearer ' + token}, flask_test_client=client)
    assert socket_io_test_client.is_connected()

from api import app, socketio
from flask import jsonify
from ..endpoints.constants import consent_data
import json

def test_connection(client, init_db):
    response = client.post("/login", data=dict(username='username', password='password'))
    token = response.get_json()['access_token']
    socket_io_test_client = socketio.test_client(app, headers={'Authorization': 'Bearer ' + token}, flask_test_client=client)
    assert socket_io_test_client.is_connected()


def test_inserting_consent_triggers_free_laptops(client, init_db):
    # Login
    response = client.post("/login", data=dict(username='username', password='password'))
    token = response.get_json()['access_token']
    socket_io_test_client = socketio.test_client(app, headers={'Authorization': 'Bearer ' + token}, flask_test_client=client)
    response = client.post("/form", headers={'Authorization': 'Bearer ' + token}, json=consent_data)
    
    received = socket_io_test_client.get_received()
    assert received[0]['name'] == 'free-laptops'

    received = socket_io_test_client.emit("free", "I am free", callback=True)
    assert received['firstName'] == consent_data['children'][0]['firstName']

    
    received = socket_io_test_client.emit("free", "I am free", callback=True)
    assert received['firstName'] == consent_data['children'][1]['firstName']

    
    received = socket_io_test_client.emit("free", "I am free", callback=True)
    assert received['firstName'] == consent_data['children'][2]['firstName']

def test_three_simultaneous_clients(client, init_db):
    response = client.post("/login", data=dict(username='username', password='password'))
    token = response.get_json()['access_token']

    socket_io_test_client1 = socketio.test_client(app, headers={'Authorization': 'Bearer ' + token}, flask_test_client=client)
    socket_io_test_client2 = socketio.test_client(app, headers={'Authorization': 'Bearer ' + token}, flask_test_client=client)
    socket_io_test_client3 = socketio.test_client(app, headers={'Authorization': 'Bearer ' + token}, flask_test_client=client)

    response = client.post("/form", headers={'Authorization': 'Bearer ' + token}, json=consent_data)

    received = socket_io_test_client1.get_received()
    assert received[0]['name'] == 'free-laptops'

    received = socket_io_test_client2.get_received()
    assert received[0]['name'] == 'free-laptops'

    received = socket_io_test_client3.get_received()
    assert received[0]['name'] == 'free-laptops'


    received = socket_io_test_client1.emit("free", "I am free", callback=True)
    assert received['firstName'] == consent_data['children'][0]['firstName']

    
    received = socket_io_test_client2.emit("free", "I am free", callback=True)
    assert received['firstName'] == consent_data['children'][1]['firstName']

    
    received = socket_io_test_client3.emit("free", "I am free", callback=True)
    assert received['firstName'] == consent_data['children'][2]['firstName']

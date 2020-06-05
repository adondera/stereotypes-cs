"""Tests for dashboard statistics."""
from api.models import Version


def test_stats(client, init_db_with_participants):
    """
    Tests the initial connection with the client socket
    :param client: Testing client for flask
    :param init_db_with_participants: Initialize database
    :return: Nothing
    """

    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['access_token']
    response = client.get("/stats", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    print(response.get_json())
    assert response.get_json()['num_of_participants']['all_time'] == 1
    assert response.get_json()['num_of_participants']['today'] == 1
    assert response.get_json()['num_of_participants']['yesterday'] == 0
    assert response.get_json()['average_participant_age'] == 15
    assert response.get_json()['version_distribution'][0]['version_name'] == Version.A.value
    assert response.get_json()['gender_distribution'][0]['gender'] == "Jongen"
    assert response.get_json()['gender_distribution'][0]['number'] == 1
    assert response.get_json()['ethnicity_distribution'][0]['ethnicity'] == 'Nederlands'
    assert response.get_json()['ethnicity_distribution'][0]['number'] == 1
    assert response.get_json()['ethnicity_distribution'][1]['number'] == 0

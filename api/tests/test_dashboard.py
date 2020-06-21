# pylint: disable=unused-argument
# init_db fixture is run automatically, therefore we need it
"""Tests for dashboard statistics."""
from api.models import Version, Participant


def test_stats(client, init_db_with_participants):
    """
    Tests the /stats endpoint
    :param client: Testing client for flask
    :param init_db_with_participants: Initialize database
    :return: Nothing
    """

    login_response = client.post("/login", data=dict(username='username', password='password'))
    assert login_response.status_code == 200
    token = login_response.get_json()['access_token']

    response = client.get("/stats", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
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


def test_stats_gender(client, init_db_with_participants):
    """
    Tests the gender distribution from /stats endpoint
    :param client: Testing client for flask
    :param init_db_with_participants: Initialize database
    :return: Nothing
    """

    login_response = client.post("/login", data=dict(username='username', password='password'))
    assert login_response.status_code == 200
    token = login_response.get_json()['access_token']

    # create a new participant with no gender
    Participant.create_participant(1, "New", "Participant", 15, quiz_version=Version.A)

    response = client.get("/stats", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert response.get_json()['gender_distribution'][-1]['gender'] == "Not known"
    assert response.get_json()['gender_distribution'][-1]['number'] == 1


def test_active_participants(client, init_db_with_participants):
    """
    Tests the /active-participants endpoint
    :param client: Testing client for flask
    :param init_db_with_participants: Initialize database
    :return: Nothing
    """

    login_response = client.post("/login", data=dict(username='username', password='password'))
    assert login_response.status_code == 200
    token = login_response.get_json()['access_token']

    response = client.get("/active-participants", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)
    assert len(response.get_json()) == 1
    assert response.get_json()[0]['name'] == 'Ionut Cons'
    assert response.get_json()[0]['finished'] is True


def test_participants_data(client, init_db_with_participants):
    """
    Tests the /participants endpoint
    :param client: Testing client for flask
    :param init_db_with_participants: Initialize database
    :return: Nothing
    """

    login_response = client.post("/login", data=dict(username='username', password='password'))
    assert login_response.status_code == 200
    token = login_response.get_json()['access_token']

    response = client.get("/participants", headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 200
    assert isinstance(response.get_json()['data'], list)
    assert len(response.get_json()['data'][0]) == len(response.get_json()['columns'])
    assert response.get_json()['columns'][0] == "Participant Name"
    assert response.get_json()['data'][0][5] == Version.A.value

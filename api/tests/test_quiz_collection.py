# pylint: disable=unused-argument
"""
Tests that exercises the endpoints for the data collection application
"""
from api.models import Participant, QuestionChoice, Version, Question
from api.script import populate
from api.endpoints.constants import COLUMNS_RESULTS
from .test_constants import consent_data, answer, GENDER_ETHNICITY_NOANSWER


def test_quiz_bad_form(init_db, client):
    """
    Tests that a request with a wrong body is rejected
    :param init_db: Initializes database
    :param client: Testing client to make requests
    :return: Nothing
    """
    bad_consent_data = {
        "parent": {
            "firstName": "string",
        },
        "children": [
            {
                "firstName": "string",
                "lastName": "string"
            }
        ],
        "signature": "string",
        "email": "user@example.com"
    }
    form_response = client.post('/form', json=bad_consent_data)
    assert form_response.status_code == 400


def test_quiz_answers_participant_info(init_db, client):
    """
    Tests that the participant, gender and age of a participant
    are changed after answer to respective questions are submitted.
    :param init_db: Initializes the database
    :param client: Testing client for requests
    :return: Nothing
    """
    populate()

    form_response = client.post('/form', json=consent_data)
    assert form_response.status_code == 200

    login_response = client.post("/login", data=dict(username='admin', password='admin'))
    assert login_response.status_code == 200
    token = login_response.get_json()['access_token']

    assert Participant.query.filter_by(id=1).first()
    client.post('/answers', json=answer, headers={'Authorization': 'Bearer ' + token})

    participant = Participant.query.filter_by(id=1).first()
    assert participant.age == \
           int(QuestionChoice.query.filter_by(question_id=answer['data'][0]["question_id"],
                                              choice_num=answer['data'][0]['answers']).first().text)

    ethinicities = []
    for choice_num in answer['data'][1]['answers']:
        eth = QuestionChoice.query.filter_by(
            choice_num=choice_num, question_id=answer['data'][1]["question_id"]).first().text
        ethinicities.append(eth)
    assert participant.ethnicity == ethinicities

    assert participant.gender == \
           QuestionChoice.query.filter_by(question_id=answer['data'][2]["question_id"],
                                          choice_num=answer['data'][2]['answers']).first().text

    assert participant.quiz_version == Version[answer['version']]


def test_quiz_answers_non_participant_info(init_db, client):
    """
    Tests that answers to questions that don't have any relation
    to the participant info are saved in the database
    :param init_db: Initializes the database
    :param client: Testing client for requests
    :return: Nothing
    """
    populate()

    form_response = client.post('/form', json=consent_data)
    assert form_response.status_code == 200

    login_response = client.post("/login", data=dict(username='admin', password='admin'))
    assert login_response.status_code == 200
    token = login_response.get_json()['access_token']

    assert Participant.query.filter_by(id=1).first()
    client.post('/answers', json=answer, headers={'Authorization': 'Bearer ' + token})
    participant = Participant.query.filter_by(id=1).first()
    assert participant.answers


def test_quiz_answers_participant_no_gender_no_ethnicity(init_db, client):
    """
    Tests that if the participant decides to not answer questions
    regarding gender or ethnicity, nothing is saved in the database.
    :param init_db: Initializes the database
    :param client: Testing client for requests
    :return: Nothing
    """
    populate()

    form_response = client.post('/form', json=consent_data)
    assert form_response.status_code == 200

    login_response = client.post("/login", data=dict(username='admin', password='admin'))
    assert login_response.status_code == 200
    token = login_response.get_json()['access_token']

    assert Participant.query.filter_by(id=1).first()
    client.post('/answers',
                json=GENDER_ETHNICITY_NOANSWER, headers={'Authorization': 'Bearer ' + token})
    participant = Participant.query.filter_by(id=1).first()
    assert participant.age is None
    assert participant.gender is None


def test_get_quiz_version(init_db, client):
    """
    Tests that when requesting a quiz version a list of questions is returned
    :param init_db: Initializes the database
    :param client: Testing client for requests
    :return: Nothing
    """
    populate()

    response = client.post("/login", data=dict(username='admin', password='admin'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    version = 'A'
    response = client.get('/quiz?version={}'.format(version),
                          headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 200
    assert isinstance(response.get_json(), list)


def test_get_nonexistent_quiz_version(init_db, client):
    """
    Tests that a request that asks for a non-existing versions
    returns a 404 Not found message.
    :param init_db: Initializes the database
    :param client: Testing client for requests
    :return: Nothing
    """
    populate()

    response = client.post("/login", data=dict(username='admin', password='admin'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    version = 'nonexistent'
    response = client.get('/quiz?version={}'.format(version),
                          headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 404


def test_get_random_quiz(init_db, client):
    """
    Tests that a request for a random quiz returns a list of questions
    :param init_db: Initializes the database
    :param client: Testing client for requests
    :return: Nothing
    """
    populate()

    response = client.post("/login", data=dict(username='admin', password='admin'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    response = client.get('/random-quiz',
                          headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 200
    assert isinstance(response.get_json(), list)


def test_fail_random_quiz(init_db, client):
    """
    Tests that a request on an empty database returns a not found message
    :param init_db: Initializes the database
    :param client: Testing client for requests
    :return: Nothing
    """
    response = client.post("/login",
                           data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    response = client.get('/random-quiz',
                          headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 404


def test_get_quiz_versions(init_db, client):
    """
    Tests that a request for the quiz versions returns a list
    of all different names of versions.
    :param init_db: Initializes the database
    :param client: Testing client for requests
    :return: Nothing
    """
    response = client.post("/login",
                           data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    response = client.get('/quiz-versions',
                          headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 200

    for key, value in response.get_json().items():
        assert Version[key].value == value


def test_quiz_results(init_db, client):
    """
    Tests that a request for available results returns two arrays:
    A array with the names of the columns for an excel spreadsheet
    A array of rows for the respective columns.
    :param init_db: Initializes the database
    :param client: Testing client for requests
    :return: Nothing
    """
    populate()

    response = client.post('/form', json=consent_data)
    assert response.status_code == 200

    response = client.post("/login",
                           data=dict(username='admin', password='admin'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    response = client.post('/answers',
                           json=answer, headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 201

    response = client.get('/results',
                          headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 200
    print(response.get_json())

    assert response.get_json()['columns'] == COLUMNS_RESULTS

    name = "{} {}".format(consent_data['children'][0]['firstName'],
                          consent_data['children'][0]['lastName'])

    assert response.get_json()['data'][0][0] == name

    q_id = answer['data'][4]['question_id']
    assert int(response.get_json()['data'][0][1]) == q_id

    question = Question.query.filter_by(id=q_id).first()
    q_type = question.q_type.value
    q_text = question.text

    assert response.get_json()['data'][0][2] == q_type
    assert response.get_json()['data'][0][3] == q_text

    q_answer = answer['data'][4]['answers']
    assert int(response.get_json()['data'][0][4]) == q_answer

    img_link = None
    assert response.get_json()['data'][0][5] == img_link

    response_time = None
    assert response.get_json()['data'][0][6] == response_time

    before_video = answer['data'][4]['before_video']
    assert response.get_json()['data'][0][7] == before_video


def test_quiz_answers_wrong_validation(init_db, client):
    """
    Tests that a post request with a bad request body is denied
    :param init_db: Initializes the database
    :param client: Testing client for requests
    :return: Nothing
    """
    login_response = client.post("/login",
                                 data=dict(username='username', password='password'))
    assert login_response.status_code == 200
    token = login_response.get_json()['access_token']

    random_request_body = {
        "data": "stuff",
        "id": 1,
        "version": "A"
    }

    response = client.post('/answers',
                           json=random_request_body, headers={'Authorization': 'Bearer ' + token})
    assert response.status_code == 400

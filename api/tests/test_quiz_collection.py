from .test_constants import consent_data, answer
from api.models import Participant, Question, QuestionChoice, Version
from api.script import populate


def test_quiz_answers_participant_info(init_db, client):
    populate()
    response = client.post('/form', json=consent_data)
    assert response.status_code == 200
    assert Participant.query.filter_by(id=1).first()
    client.post('/answers', json=answer)

    p = Participant.query.filter_by(id=1).first()
    assert p.age == int(QuestionChoice.query.filter_by(question_id=answer['data'][0]["question_id"],
                                                       choice_num=answer['data'][0]['answers']).first().text)

    ethinicities = []
    for choice_num in answer['data'][1]['answers']:
        eth = QuestionChoice.query.filter_by(
            choice_num=choice_num, question_id=answer['data'][1]["question_id"]).first().text
        ethinicities.append(eth)
    assert p.ethnicity == ethinicities

    assert p.gender == QuestionChoice.query.filter_by(question_id=answer['data'][2]["question_id"],
                                                      choice_num=answer['data'][2]['answers']).first().text

    assert p.quiz_version == Version[answer['version']]


def test_quiz_answers_non_participant_info(init_db, client):
    populate()
    response = client.post('/form', json=consent_data)
    assert response.status_code == 200
    assert Participant.query.filter_by(id=1).first()
    client.post('/answers', json=answer)
    p = Participant.query.filter_by(id=1).first()
    assert p.answers


def test_get_quiz_version(init_db, client):
    populate()

    response = client.post("/login", data=dict(username='admin', password='admin'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    version = 'A'
    response = client.get('/quiz?version={}'.format(version), headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 200
    assert isinstance(response.get_json(), list)


def test_get_nonexistent_quiz_version(init_db, client):
    populate()

    response = client.post("/login", data=dict(username='admin', password='admin'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    version = 'nonexistent'
    response = client.get('/quiz?version={}'.format(version), headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 404


def test_get_random_quiz(init_db, client):
    populate()

    response = client.post("/login", data=dict(username='admin', password='admin'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    response = client.get('/random-quiz', headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 200
    assert isinstance(response.get_json(), list)
    

def test_fail_random_quiz(init_db, client):
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    response = client.get('/random-quiz', headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 404


def test_get_quiz_versions(init_db, client):
    response = client.post("/login", data=dict(username='username', password='password'))
    assert response.status_code == 200
    token = response.get_json()['access_token']

    response = client.get('/quiz-versions', headers={'Authorization': 'Bearer ' + token})

    assert response.status_code == 200

    for key, value in response.get_json().items():
        assert Version[key].value == value
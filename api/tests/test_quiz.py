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
    assert p.age == int(QuestionChoice.query.filter_by(question_id=answer['data'][0]["question_id"], choice_num=answer['data'][0]['answers']).first().text)
    
    ethinicities = []
    for choice_num in answer['data'][1]['answers']:
        eth = QuestionChoice.query.filter_by(
            choice_num=choice_num, question_id=answer['data'][1]["question_id"]).first().text
        ethinicities.append(eth)
    assert p.ethnicity == ethinicities

    assert p.gender == QuestionChoice.query.filter_by(question_id=answer['data'][2]["question_id"], choice_num=answer['data'][2]['answers']).first().text

    assert p.quiz_version == Version[answer['version']]

def test_quiz_answers_non_participant_info(init_db, client):
    populate()
    response = client.post('/form', json=consent_data)
    assert response.status_code == 200
    assert Participant.query.filter_by(id=1).first()
    client.post('/answers', json=answer)
    p = Participant.query.filter_by(id=1).first()
    assert p.answers

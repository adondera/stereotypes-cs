from .test_constants import consent_data, answer
from api.models import Participant, Question, QuestionChoice, Version
from api.script import populate
import random

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


def test_calculate_result_bias_block_3(client, make_quiz):
    response_range_3 = range(80, 100)
    response_range_5 = range(100, 120)    

    question3, question5 = make_quiz
    
    data = {}
    data['data'] = generate_answers(question3, question5, response_range_3, response_range_5)
    data['email'] = 'test@random123.abc'

    response = client.post('/calculate', json=data)
    assert response.status_code == 200
    assert "programmeur te associëren met jongen" in response.get_json()
    assert "schrijver met meisje" in response.get_json()


def test_calculate_result_bias_block_5(client, make_quiz):
    response_range_left = range(100, 120)
    response_range_right = range(80, 100)

    question3, question5 = make_quiz

    data = {}
    data['data'] = generate_answers(question3, question5, response_range_left, response_range_right)
    data['email'] = 'test@domain.com'

    response = client.post('/calculate', json=data)
    assert response.status_code == 200
    assert "programmeur te associëren met meisje" in response.get_json()
    assert "schrijver met jongen" in response.get_json()


def test_calculate_result_no_bias(client, make_quiz):
    populate()

    response_range = range(100, 120)  
    
    question3, question5 = make_quiz
    
    data = {}
    data['data'] = generate_answers(question3, question5, response_range, response_range)
    data['email'] = 'test@random123.abc'

    response = client.post('/calculate', json=data)
    assert response.status_code == 200
    assert response.get_json() == "De resultaten laten zien dat je geen vooringenomenheid hebt."


def generate_answers(q3, q5, range_left, range_right, sample_size=32):
    
    block_3_times = random.choices(range_left, k=sample_size) 
    block_5_times = random.choices(range_right, k=sample_size)

    block_3 = list(map(lambda x: {"block_nr": 3, "response_time": x, "question_id": q3.id}, block_3_times))
    block_5 = list(map(lambda x: {"block_nr": 5, "response_time": x, "question_id": q5.id}, block_5_times))

    block_3.extend(block_5)

    return block_3

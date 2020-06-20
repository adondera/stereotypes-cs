# pylint: disable=unused-argument
"""
Tests for the data dissemination application
"""
import random
from api.endpoints.constants import DISSEMINATION_NO_ASSOCIATION, \
    DISSEMINATION_RESULT_FEMALE, DISSEMINATION_RESULT_MALE
from api.script import populate


def test_calculate_result_bias_block_3(client, make_quiz):
    """
    Tests that short response times in block3 => associate male faster
    :param client: the client that simulates the request
    :param make_quiz: fixture that creates the quiz
    :return: nothing
    """
    response_range_3 = range(80, 100)
    response_range_5 = range(100, 120)

    question3, question5 = make_quiz

    data = {}
    data['data'] = generate_answers(question3, question5, response_range_3, response_range_5)
    data['email'] = 'test@random123.abc'

    response = client.post('/calculate', json=data)
    assert response.status_code == 200
    assert response.get_json() == DISSEMINATION_RESULT_MALE


def test_calculate_result_bias_block_3_no_email(client, make_quiz):
    """
    Tests that short response times in block3 => associate male faster
    :param client: the client that simulates the request
    :param make_quiz: fixture that creates the quiz
    :return: nothing
    """
    response_range_3 = range(80, 100)
    response_range_5 = range(100, 120)

    question3, question5 = make_quiz

    data = {}
    data['data'] = generate_answers(question3, question5, response_range_3, response_range_5)

    response = client.post('/calculate', json=data)
    assert response.status_code == 200
    assert response.get_json() == DISSEMINATION_RESULT_MALE


def test_calculate_result_bias_block_5(client, make_quiz):
    """
    Tests that short response times in block5 => associate female faster
    :param client: the client that simulates the request
    :param make_quiz: fixture that creates the quiz
    :return: nothing
    """
    response_range_left = range(100, 120)
    response_range_right = range(80, 100)

    question3, question5 = make_quiz

    data = {}
    data['data'] = generate_answers(question3, question5, response_range_left, response_range_right)
    data['email'] = 'test@domain.com'

    response = client.post('/calculate', json=data)
    assert response.status_code == 200
    assert response.get_json() == DISSEMINATION_RESULT_FEMALE


def test_calculate_result_no_bias(client, make_quiz):
    """
    Tests that same response times in blocks 3 and 5 => no association
    :param client: the client that simulates the request
    :param make_quiz: fixture that creates the quiz
    :return: nothing
    """
    populate()

    response_range = range(100, 101)

    question3, question5 = make_quiz

    data = {}
    data['data'] = generate_answers(question3, question5, response_range, response_range)
    data['email'] = 'test@random123.abc'

    response = client.post('/calculate', json=data)
    assert response.status_code == 200
    assert response.get_json() == DISSEMINATION_NO_ASSOCIATION


def generate_answers(question_3, question_5, range_3, range_5, sample_size=32):
    """
    Helper function that generates answers with response times in
    a certain range
    :param question_3: The question in block 3
    :param question_5: The question in block 5
    :param range_3: Range of response times in block 3
    :param range_5: Range of response times in block 5
    :param sample_size: Amount of images to associate
    :return: List of answers
    """
    block_3_times = random.choices(range_3, k=sample_size)
    block_5_times = random.choices(range_5, k=sample_size)

    block_3 = list(map(lambda x: {"block_nr": 2, "response_time": x, "question_id": question_3.id},
                       block_3_times))
    block_5 = list(map(lambda x: {"block_nr": 4, "response_time": x, "question_id": question_5.id},
                       block_5_times))

    block_3.extend(block_5)

    return block_3


def test_get_dissemination_quiz(client, init_db):
    """
    Tests that a request for a dissemination quiz returns
    a list of questions
    :param client: Testing client for requests
    :param init_db: Initializes database
    :return: Nothing
    """
    populate()

    response = client.get('/iat')

    assert response.status_code == 200
    assert isinstance(response.get_json(), list)


def test_fail_dissemination_quiz(client, init_db):
    """
    Tests that a request for a quiz with nothing in the database
    returns a Not found message
    :param client: Testing client for requests
    :param init_db: Initializes database
    :return: Nothing
    """
    response = client.get('/iat')

    assert response.status_code == 404


def test_invalid_results_object_none(client, init_db):
    """
    Tests that trying to calculate the results from a badly formatted request
    (data is not a list)
    returns a Bad request message
    :param client: Testing client for requests
    :param init_db: Initializes database
    :return: Nothing
    """
    data = {}
    data['data'] = 1

    response = client.post('/calculate', json=data)
    assert response.status_code == 400


def test_invalid_results_object(client, init_db):
    """
    Tests that trying to calculate the results for a badly formatted request
    (data is list but contains wrong types)
    returns a Bad request message
    :param client: Testing client for requests
    :param init_db: Initializes the database
    :return:Nothing
    """
    data = {}
    data['data'] = ["somestring"]

    response = client.post('/calculate', json=data)
    assert response.status_code == 400

import os
from api.endpoints.quiz_factory import QuizFactory, IATFactory
from api.script import populate
from api.models import QuestionType, Question

def test_quiz_factory_constructor(rootdir, init_db, client):
    test_file = os.path.join(rootdir, 'test_files/gender-profession.json')
    factory = QuizFactory(test_file)
    assert 'gender_profession' in factory.data
    assert 'social_profession' in factory.data
    assert 'hobby_profession' in factory.data
    assert 'eat' in factory.data
    assert 'video' in factory.data
    assert 'demographics' in factory.data

def test_quiz_factory_iat(rootdir, init_db, client):
    """
    Populates the database and creates a gender IAT
    Tests that the response has the right format
    """
    populate()
    test_file = os.path.join(rootdir, 'test_files/gender-profession.json')
    factory = QuizFactory(test_file)

    # No binary questions in the database before the create
    binary_questions = Question.query.filter_by(q_type=QuestionType.binary).all()
    assert len(binary_questions) == 0

    # After the create the question should be inserted in the database
    response = factory.gender_profession.create_iat()
    binary_questions = Question.query.filter_by(q_type=QuestionType.binary).all()
    assert len(binary_questions) == 1

    # The response should have the following format
    assert response[0]['q_type'] == QuestionType.information.name
    for i in range(1, len(response)):
        assert response[i]['q_type'] == QuestionType.binary.name
        assert 'categories_left' in response[i]
        assert 'categories_right' in response[i]
        assert 'image' in response[i]


def test_create_guide_text(rootdir, init_db):
    populate()
    phase = {
                "left_categ": [1], 
                "right_categ": [2]
            }
    text = IATFactory.create_guide_text(phase)
    assert text == "Press the E key for the images that belong to the categories (male),or press the I key for the images that belong to the categories (female)"
    
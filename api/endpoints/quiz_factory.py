# pylint: disable=too-many-instance-attributes, no-self-use, too-few-public-methods
"""
Module that contains the classes that create the different components for a quiz
"""
import json
from sqlalchemy import or_

from api.models import QuestionType, Question, Image, Question_to_category, Category
from api.models.helpers import add_to_db
from api.endpoints.constants import BLOCK_START_TEXT, BLOCK_END_TEXT, FINAL_BLOCK_TEXT, \
    COLLECTION_QUIZ_END_TEXT, COLLECTION_QUIZ_BEGINNING_TEXT, INTERVENTION_VIDEO_TEXT, \
    CONTROL_VIDEO_TEXT, DISSEMINATION_QUIZ_END_TEXT


class QuizFactory:
    """
    Class that creates a quiz from a file
    """

    def __init__(self, filename):
        with open(filename) as file:
            self.data = json.load(file)
            self.response = []
            self.gender_profession = IATFactory(self.data["gender_profession"])
            self.social_profession = IATFactory(self.data["social_profession"])
            self.hobby_profession = IATFactory(self.data["hobby_profession"])
            self.eat = EATFactory(self.data["eat"])
            self.video = VideoFactory(self.data['video'])
            self.demographics = DemographicsFactory(self.data['demographics'])

    def create_collection_quiz(self):
        """
        Creates a quiz by combining the different components
        :return: The response to the collection application with all the questions
        """

        self.response = []
        self.create_information_beginning(COLLECTION_QUIZ_BEGINNING_TEXT)
        if 'before' in self.video.data and self.video.data['before']:
            self.response.extend(self.video.create_video())
        self.response.extend(self.gender_profession.create_iat())
        self.response.extend(self.social_profession.create_iat())
        self.response.extend(self.hobby_profession.create_iat())
        self.create_end_iat_text()
        self.response.extend(self.eat.create_eat())
        self.response.extend(self.demographics.create_demographics())
        if 'before' in self.video.data and not self.video.data['before']:
            self.response.extend(self.video.create_video())
        self.create_ending(COLLECTION_QUIZ_END_TEXT)
        self.create_researcher_notes()
        return self.response

    def create_dissemination_quiz(self):
        """
        Creates a quiz for the data dissemination application
        :return: The response to the dissemination application with the list of questions
        """

        self.response = []
        self.response.extend(self.gender_profession.create_iat())
        self.response.extend(self.social_profession.create_iat())
        self.response.extend(self.hobby_profession.create_iat())
        self.create_ending(DISSEMINATION_QUIZ_END_TEXT)
        return self.response

    def create_ending(self, end_text):
        """
        Creates a type finish question to be shown at the end of the test

        Parameters
        ----------
        end_text : string
            text to be used for the question.
        """
        self.response.append({
            "q_type": QuestionType.finish.value,
            "title": "Einde",
            "text": end_text
        })

    def create_researcher_notes(self):
        """
        Creates a type notes question for researcher notes
        """
        self.response.extend(Question.query.filter_by(q_type=QuestionType.notes)
                             .first()
                             .make_response())

    def create_information_beginning(self, beginning_text):
        """
        Creates a type information question to be shown at the start of the test

        Parameters
        ----------
        beginning_text : string
            text to be used for the question.
        """
        self.response.append({
            "q_type": QuestionType.information.value,
            "text": beginning_text
        })

    def create_end_iat_text(self):
        """
        Creates a type information question for collection test
        """
        end_text = FINAL_BLOCK_TEXT.copy()
        end_text['q_type'] = QuestionType.information.value
        self.response.append(end_text)


class VideoFactory:
    """
    Class that creates the video "questions".
    """

    def __init__(self, data):
        self.data = data

    def create_video(self):
        """
        Create a video question for the quiz.
        The video is taken randomly, but it can also be taken from its id from data
        :return: Returns that question as a response
        """

        video = Question.query.filter_by(id=self.data['id']).first()
        video.text = self.create_video_text()
        print(video.images)
        return video.make_response()

    def create_video_text(self):
        """
        Checks if video is at the start or at the end of the quiz.
        :return: Returns the corresponding text for its posisiton
        """
        if not self.data['before']:
            return INTERVENTION_VIDEO_TEXT
        return CONTROL_VIDEO_TEXT


class DemographicsFactory:
    """
    Class that creates the demographics questions
    """

    def __init__(self, data):
        self.data = data
        self.response = []

    def create_demographics(self):
        """
        Creates a response object with all the demographics questions
        :return: The response with a list of questions
        """

        self.response.append({
            "q_type": QuestionType.information.value,
            "text": "Je bent er bijna, nog een paar vragen!"
        })
        for q_id in self.data:
            self.response.extend(Question.query.filter_by(
                id=q_id).first().make_response())
        return self.response


class EATFactory:
    """
    Class that creates the EAT questions (mostly Likert scale)
    """

    def __init__(self, data):
        self.data = data
        self.response = []

    def create_eat(self):
        """
        Create a response object with the likert scale questions
        :return: The response with a list of questions
        """

        for q_id in self.data:
            self.response.extend(Question.query.filter_by(
                id=q_id).first().make_response())
        return self.response


class IATFactory:
    """
    Class that creates an IAT test by combining different categories in self.data
    """

    def __init__(self, data):
        self.data = data
        self.response = []

    def create_iat(self):
        """
        Creates an IAT response object
        :return: A list with all the IAT questions
        """

        for block_nr, phase in enumerate(self.data, 5 - len(self.data)):
            self.create_guide_text(phase, block_nr)
            self.load_phase(phase, block_nr)
        return self.response

    def load_phase(self, phase, block_nr):
        """
        Loads a question (phase) from the database if it exists
        Otherwise it creates a new question and adds it to the database
        :param phase: Object with the left and right categories
        :return: A list of questions for the phase
        """

        questions = list((map(lambda x: {
            "id": x.id,
            "left": list(map(lambda y: y['id'], x.as_dict()['categories_left'])),
            "right": list(map(lambda y: y['id'], x.as_dict()['categories_right']))
        }, Question.query.filter_by(q_type=QuestionType.binary).all())))

        questions = list(
            filter(
                lambda x: x['left'] == phase['left_categ'] and x['right'] == phase['right_categ'],
                questions
            )
        )

        assert len(questions) <= 1, "Should have at most one result"

        if len(questions) == 0:
            question = self.create_new_phase(phase)
            assert question.id
            self.append_response(question, block_nr)
            return

        question = Question.query.filter_by(id=questions[0]['id']).first()
        self.append_response(question, block_nr)

    def append_response(self, question, block_nr):
        """
        Adds the block number to a question
        :param question: The question to use
        :param block_nr: The block number to append
        """
        dictionary = question.as_dict()
        dictionary['block_nr'] = block_nr
        self.response.extend(question.make_response())

    def create_new_phase(self, phase):
        """
        Creates a new phase with the specified categories.
        It will take all images with the categories and add them to the question
        :param phase: The left and right categories in an object
        :return: A newly created question
        """

        images = Image.query.filter(
            or_(Image.category_id.in_(phase['left_categ']),
                Image.category_id.in_((phase['right_categ'])))).all()

        question = Question(text="", q_type=QuestionType.binary, images=images)
        add_to_db(question)

        for c_left in phase['left_categ']:
            q_to_c = Question_to_category(
                q_id=question.id, c_id=c_left, is_left=True)
            add_to_db(q_to_c)

        for c_right in phase['right_categ']:
            q_to_c = Question_to_category(
                q_id=question.id, c_id=c_right, is_left=False)
            add_to_db(q_to_c)

        return question

    def create_guide_text(self, phase, block_nr):
        """
        Creates the text before a phase in a IAT
        :param phase: Object that contains the left and right categories in the phase
        :return: The text to be showed before the phase
        """

        guide_text = BLOCK_START_TEXT[block_nr].copy()
        guide_text['q_type'] = QuestionType.binary_information.value
        c_left = list(map(lambda x: (x.name, x.id),
                          Category.query.filter(Category.id.in_(phase['left_categ'])).all()))
        c_right = list(map(lambda x: (x.name, x.id),
                           Category.query.filter(Category.id.in_(phase['right_categ'])).all()))
        guide_text['text1'] = guide_text['text1'].format(
            c_left[0][0].lower(),
            c_left[1][0].lower() if len(c_left) >= 2 else None
        )
        guide_text['text2'] = guide_text['text2'].format(
            c_right[0][0].lower(),
            c_right[1][0].lower() if len(c_right) >= 2 else None
        )
        guide_text['text3'] = BLOCK_END_TEXT
        images0 = list(map(lambda x: x.link,
                           Image.query.filter(Image.category_id.in_(phase['left_categ']))))

        images1 = list(map(lambda x: x.link,
                           Image.query.filter(Image.category_id.in_(phase['right_categ']))))
        guide_text['images0'] = images0
        guide_text['images1'] = images1
        self.response.append(guide_text)

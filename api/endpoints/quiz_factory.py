"""
Module that contains the classes that create the different components for a quiz
"""
import json
import random
from sqlalchemy import or_

from api.models import QuestionType, Question, Image, add_to_db, Question_to_category, Category


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

    def create_quiz(self):
        """
        Creates a quiz by combining the different components
        :return: The response object with all the questions
        """
        if self.video.data['before']:
            self.response.extend(self.video.create_video())
        self.response.extend(self.gender_profession.create_iat())
        self.response.extend(self.social_profession.create_iat())
        self.response.extend(self.hobby_profession.create_iat())
        self.response.extend(self.eat.create_eat())
        if not self.video.data['before']:
            self.response.extend(self.video.create_video())
        self.response.extend(self.demographics.create_demographics())
        self.create_ending()
        return self.response

    def create_ending(self):
        self.response.append({
            "q_type": QuestionType.finish.value,
            "title": "Ending",
            "text": "Bedankt voor het meedoen aan dit onderzoek! We willen je vragen om niet te verklappen"
                    "wat je precies gedaan hebt aan andere kinderen die misschien nog mee willen doen.\n"
                    "Steek je hand op, dan komt er zo snel mogelijk iemand naar je toe."
        })
        self.response.extend(Question.query.filter_by(q_type=QuestionType.notes).first().make_response())


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
        if self.data['before']:
            return "Wat goed gedaan! Je hebt alle vragen gehad. Je mag nog een korte video kijken waarin je "\
                   "vertellen wat een programmeur eigenlijk is."
        return "Allereerst ga je naar een video kijken waarin we je uitleg geven""over het beroep ‘programmeur’."



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
        for q_id in self.data:
            self.response.extend(Question.query.filter_by(id=q_id).first().make_response())
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
        iat_explanation = {
            "q_type": QuestionType.information.value,
            "title": "Information",
            "header": "Explicit IAT",
            "text":
                "In the following minutes you will be shown several statements. "
                "Please indicate how much you agree with the statement",
        }
        self.response.append(iat_explanation)
        for q_id in self.data:
            self.response.extend(Question.query.filter_by(id=q_id).first().make_response())
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
        for phase in self.data:
            self.load_phase(phase)

        return self.response

    def load_phase(self, phase):
        """
        Loads a question (phase) from the database if it exists
        Otherwise it creates a new question and adds it to the database
        :param phase: Object with the left and right categories
        :return: A list of questions for the phase
        """
        self.response.append({
            "q_type": QuestionType.information.value,
            "title": "Information",
            "header": "Gender profession IAT",
            "text": IATFactory.create_guide_text(phase)
        })

        questions = list((map(lambda x: {
            "id": x.id,
            "left": list(map(lambda y: y['id'], x.as_dict()['categories_left'])),
            "right": list(map(lambda y: y['id'], x.as_dict()['categories_right']))
        }, Question.query.filter_by(q_type=QuestionType.binary).all())))

        questions = list(
            filter(lambda x: x['left'] == phase['left_categ']
                             and x['right'] == phase['right_categ'], questions))

        assert len(questions) <= 1, "Should have at most one result"

        if len(questions) == 0:
            question = self.create_new_phase(phase)
            assert question.id
            self.response.extend(question.make_response())
            return

        self.response.extend(Question.query.filter_by(id=questions[0]['id'])
                             .first().make_response())

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
            q_to_c = Question_to_category(q_id=question.id, c_id=c_left, is_left=True)
            add_to_db(q_to_c)

        for c_right in phase['right_categ']:
            q_to_c = Question_to_category(q_id=question.id, c_id=c_right, is_left=False)
            add_to_db(q_to_c)

        return question

    @staticmethod
    def create_guide_text(phase):
        """
        Creates the text before a phase in a IAT
        :param phase: Object that contains the left and right categories in the phase
        :return: The text to be showed before the phase
        """
        left = map(lambda x: x.name,
                   Category.query.filter(Category.id.in_(phase['left_categ'])).all())
        string_left = '&'.join(left)
        right = map(lambda x: x.name,
                    Category.query.filter(Category.id.in_(phase['right_categ'])).all())
        string_right = '&'.join(right)
        return """Press the E key for the images that belong to the categories ({left}), \
or press the I key for the images that belong to the categories ({right})""" \
            .format(left=string_left, right=string_right)

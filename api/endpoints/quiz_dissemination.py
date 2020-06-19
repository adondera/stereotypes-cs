# pylint: disable=no-self-use
"""
This module contains the resources that handle the data dissemination quiz.
"""
import os

from flask import current_app, request
from flask_mail import Message
from flask_restful import Resource
from scipy.stats import ttest_ind as ttest

from api import mail
from api.endpoints import validation as valid

from api.endpoints.constants import ANSWERS, DISSEMINATION_NO_ASSOCIATION,\
    DISSEMINATION_RESULT_FEMALE, DISSEMINATION_RESULT_MALE
from api.endpoints.quiz_factory import QuizFactory
from api.models import Question


class DisseminationQuiz(Resource):
    """
    Returns a quiz for the data dissemination application.
    """

    def get(self):
        """
        On a get request that uses this resource it returns
        a quiz for the data dissemination application.
        :return: The quiz to be completed
        """
        try:
            filename = os.path.join(current_app.static_folder,
                                    "IATs/{}.json".format("dissemination"))
            return QuizFactory(filename).create_dissemination_quiz(), 200
        except:
            return ANSWERS[404], 404


class CalculateResult(Resource):
    """
    Defines the handlers for the /dummy route
    """

    def get_block_information(self, block_nr, data):
        """
        Gets the specific information from a block in the IAT.
        :param block_nr: The number of the block (1 to 5)
        :param data: The data from the client's request
        :return: Thq question and the answers from the specific block
        """
        question_id = next(x["question_id"] for x in data['data'] if x["block_nr"] == block_nr)
        question = Question.query.filter_by(id=question_id).first()
        block_answers = list(map(lambda x: x["response_time"],
                                 filter(lambda x: x["block_nr"] == block_nr, data['data'])))
        return question, block_answers

    def send_email(self, res, email=None):
        """
        Sends the email with the results to the recipient
        :param res: The result of the IAT
        :param email: The email of the recipient
        :return: Nothing
        """
        msg = Message('Your IAT results', recipients=[email])
        msg.body = 'Here are your IAT results: {}'.format(res)
        mail.send(msg)

    def post(self):
        """
        Analyses the results from a data dissemination quiz and gives the result.
        The result can be either that stereotypes were found, or that they weren't found.
        """
        validators = {
            "data": valid.validate_accept,
        }

        data = valid.validate(valid.read_form_data(request), validators)
        if not data:
            return ANSWERS[400], 400

        data = valid.read_form_data(request)

        question3, block_3_answers = self.get_block_information(3, data)
        question5, block_5_answers = self.get_block_information(5, data)

        t_statistic, p_value = ttest(block_3_answers, block_5_answers, equal_var=False)

        response = DISSEMINATION_NO_ASSOCIATION

        if p_value <= 0.1:
            if t_statistic < 0:
                response = DISSEMINATION_RESULT_MALE
            else:
                response = DISSEMINATION_RESULT_FEMALE

        if 'email' in data:
            self.send_email(res=response, email=data['email'])

        return response, 200

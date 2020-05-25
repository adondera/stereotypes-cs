# pylint: disable=no-self-use
"""
Module that deals with all logic related to consent forms
"""

from flask_jwt_extended import jwt_required
from flask_restful import Resource

from api.endpoints.constants import ANSWERS


class QuizAnswers(Resource):
    """Resource that deals with saving answers into database"""

    @jwt_required
    def post(self):
        return ANSWERS[200], 200


class QuizQuestions(Resource):
    """Resource that deals with retrieving questions from database"""

    @jwt_required
    def get(self):

        questions = []
        return questions, 200

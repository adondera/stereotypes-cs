# pylint: disable=no-self-use
"""
Module that deals with all logic related to consent forms
"""

from flask_jwt_extended import jwt_required
from flask_restful import Resource


class QuizAnswers(Resource):
    """Resource that deals with consent form logic"""

    @jwt_required
    def post(self):
        return

class QuizzQuestions(Resource):

    @jwt_required
    def get(self):
        return 
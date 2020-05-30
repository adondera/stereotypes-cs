# pylint: disable=no-self-use
"""
Module that deals with all logic related to consent forms
"""
import os

from flask import request
from flask import current_app
from flask_jwt_extended import jwt_required
from flask_restful import Resource

from api.endpoints.constants import ANSWERS
from api.models import ParticipantAnswer, add_to_db
from api.endpoints.quiz_factory import QuizFactory

import api.endpoints.validation as valid


class QuizAnswers(Resource):
    """Resource that deals with saving answers into database"""

    @jwt_required
    def post(self):
        """
        On a post request on the /quiz endpoint we add the quiz answers
        :return: If the request is valid, a 201 CREATED status code, otherwise a 400 code
        """
        validators = {
            "participant_id": valid.validate_int,
            "question_id": valid.validate_string,
            "img_id": valid.validate_int,
            "answers": valid.validate_list,
            "before_video": valid.validate_boolean
        }

        data = valid.validate(valid.read_form_data(request), validators)
        if not data:
            return ANSWERS[400], 400

        answer = ParticipantAnswer(participant_id=data["participant_id"],
                                   question_id=data["question_id"],
                                   img_id=data["img_id"],
                                   answers=data["answers"],
                                   answer=["response_time"],
                                   before_video=data["before_video"])
        add_to_db(answer)

        return ANSWERS[201], 201


class QuizQuestions(Resource):
    """Resource that deals with retrieving questions from database"""

    @jwt_required
    def get(self):
        """
        On a get request on the /quiz endpoint we return a quiz with questions
        :return: quiz and status 200
        """
        filename = os.path.join(current_app.static_folder, "IATs/gender-profession.json")
        return QuizFactory(filename).create_quiz(), 200

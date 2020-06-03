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
from api.models import ParticipantAnswer, add_to_db, Participant, Question, QuestionType
from api.endpoints.quiz_factory import QuizFactory

import api.endpoints.validation as valid


class QuizAnswers(Resource):
    """Resource that deals with saving answers into database"""

    # @jwt_required
    def post(self):
        """
        On a post request on the /answers endpoint we add the quiz answers
        :return: If the request is valid, a 201 CREATED status code, otherwise a 400 code
        """
        validators = {
            "data": valid.validate_answers,
            "id": valid.validate_int
        }

        data = valid.validate(valid.read_form_data(request), validators)
        if not data:
            return ANSWERS[400], 400

        for answer in data['data']:
            question_type = Question.query.filter_by(id=answer["question_id"]).first().q_type

            if (question_type == QuestionType.mc_multiple_answer or question_type == QuestionType.mc_single_answer or question_type == QuestionType.likert_demographics):
                pass
            else:
                p_answer = ParticipantAnswer(participant_id=answer["participant_id"],
                                            question_id=answer["question_id"],
                                            img_link=answer["img_link"],
                                            answers=answer["answers"],
                                            response_time=answer["response_time"],
                                            before_video=answer["before_video"],
                                            open_answer=answer["open_answer"])
            add_to_db(p_answer)

        return ANSWERS[201], 201


class QuizQuestions(Resource):
    """Resource that deals with retrieving questions from database"""

    @jwt_required
    def get(self):
        """
        On a get request on the /quiz endpoint we return a quiz with questions
        :return: quiz and status 200
        """
        filename = os.path.join(current_app.static_folder,
                                "IATs/gender-profession.json")
        return QuizFactory(filename).create_quiz(), 200


class QuizResults(Resource):

    def get(self):
        columns = ["Name", "QuestionID", "Image",
                   "Response Time", "Before Video"]
        data = []
        for answer in ParticipantAnswer.query.all():
            array = []
            participant = Participant.query.filter_by(
                id=answer.participant_id).first()
            array.append(participant.first_name + " " + participant.last_name)
            array.append(str(answer.question_id))
            array.append(answer.img_link)
            array.append(answer.response_time)
            array.append(answer.before_video)
            data.append(array)
        return {
            "columns": columns,
            "data": data
        }

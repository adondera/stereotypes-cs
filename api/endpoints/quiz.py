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
from api.models import ParticipantAnswer, add_to_db, Participant, QuestionType, Category
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
        # validators = {
        #     "participant_id": valid.validate_int,
        #     "question_id": valid.validate_int,
        #     "img_link": valid.validate_string,
        #     "answers": valid.validate_list,
        #     "before_video": valid.validate_boolean
        # }
        #
        # data = valid.validate(valid.read_form_data(request), validators)
        # if not data:
        #     return ANSWERS[400], 400
        #
        # answer = ParticipantAnswer(participant_id=data["participant_id"],
        #                            question_id=data["question_id"],
        #                            img_link=data["img_link"],
        #                            answers=data["answers"],
        #                            answer=["response_time"],
        #                            before_video=data["before_video"])
        # add_to_db(answer)

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


class QuizResults(Resource):

    #@jwt_required
    def get(self):
        columns = ["Participant Name", "Question ID", "Question Type", "Question Text",
                   "Participant Answers", "Image", "Response Time", "Before Video"]
        data = []
        for answer in ParticipantAnswer.query.all():
            array = []
            participant = Participant.query.filter_by(id=answer.participant_id).first()
            q_type = answer.question.q_type

            array.append(participant.first_name + " " + participant.last_name)
            array.append(str(answer.question_id))
            array.append(str(answer.question.q_type.name))
            array.append(str(answer.question.text))
            array.append(str(answer.answers))
            array.append(answer.img_link)
            array.append(answer.response_time)
            array.append(answer.before_video)
            data.append(array)

        return {
            "columns": columns,
            "data": data
        }



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
from api.models import ParticipantAnswer, add_to_db, commit_db_session, add_to_session, Participant, Question, ParticipantInformationType, Ethnicity, QuestionType, QuestionChoice, Participant
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

        # Iterate through every answer and insert demographics ones
        # into Participant, and the rest into ParticipantAnswer
        for answer in data['data']:
            q_type = Question.query.filter_by(
                id=answer["question_id"]).first().q_type
            i_type = Question.query.filter_by(
                id=answer["question_id"]).first().information
            participant = Participant.query.filter_by(id=data['id']).first()

            if q_type == QuestionType.mc_single_answer and i_type == ParticipantInformationType.age:
                ageString = QuestionChoice.query.filter_by(
                    choice_num=answer['answers'], question_id=answer["question_id"]).first().text
                participant.age = int(ageString)

            elif q_type == QuestionType.mc_single_answer and i_type == ParticipantInformationType.gender:
                gender = QuestionChoice.query.filter_by(
                    choice_num=answer['answers'], question_id=answer["question_id"]).first().text
                participant.gender = gender

            elif q_type == QuestionType.mc_multiple_answer and i_type == ParticipantInformationType.ethnicity:
                ethinicities = []
                for choice_num in answer['answers']:
                    eth = QuestionChoice.query.filter_by(
                        choice_num=choice_num, question_id=answer["question_id"]).first().text
                    ethinicities.append(eth)
                participant.ethnicity = ethinicities

            elif i_type == ParticipantInformationType.researcher_notes:
                participant.researcher_notes = answer['open_answer']

            else:
                ParticipantAnswer.create_participant_answer(
                    p_id=answer["participant_id"],
                    q_id=answer["question_id"],
                    img_link=answer["img_link"],
                    answers=answer["answers"],
                    r_time=answer["response_time"],
                    before_video=answer["before_video"])

        commit_db_session()
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
    """Resource that deals with retrieving answers from database"""

    @jwt_required
    def get(self):
        """
        On a get request on the /results endpoint we return all the answers stored
        :return: If the request is valid, a JSON object with the answers and code 200
        """

        columns = ["Participant Name", "Question ID", "Question Type", "Question Text",
                   "Participant Answers", "Image", "Response Time", "Before Video"]
        data = []
        for answer in ParticipantAnswer.query.all():
            array = []
            participant = Participant.query.filter_by(id=answer.participant_id).first()

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
        }, 200

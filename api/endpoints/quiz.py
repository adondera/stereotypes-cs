# pylint: disable=no-self-use
"""
Module that deals with all logic related to consent forms
"""
import os
import random
import traceback
from scipy.stats import ttest_ind as ttest

from flask import request, jsonify
from flask import current_app
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from flask_mail import Message

from api.endpoints.constants import ANSWERS
from api.models import ParticipantAnswer, add_to_db, commit_db_session, add_to_session, Participant, Question, ParticipantInformationType, Ethnicity, QuestionType, QuestionChoice, Participant, Version
from api.endpoints.quiz_factory import QuizFactory

import api.endpoints.validation as valid
from api import mail

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
            "id": valid.validate_int,
            "version": valid.validate_string
        }

        data = valid.validate(valid.read_form_data(request), validators)
        if not data:
            return ANSWERS[400], 400

        participant = Participant.query.filter_by(id=data['id']).first()
        participant.quiz_version = Version[data["version"]]

        # Iterate through every answer and insert demographics ones
        # into Participant, and the rest into ParticipantAnswer
        for answer in data['data']:
            q_type = Question.query.filter_by(
                id=answer["question_id"]).first().q_type
            i_type = Question.query.filter_by(
                id=answer["question_id"]).first().information
            
            if q_type == QuestionType.mc_single_answer and i_type == ParticipantInformationType.age:
                ageString = QuestionChoice.query.filter_by(
                    choice_num=answer['answers'], question_id=answer["question_id"]).first().text
                if ageString != "Anders":
                    participant.age = int(ageString)

            elif q_type == QuestionType.mc_single_answer and i_type == ParticipantInformationType.gender:
                gender = QuestionChoice.query.filter_by(
                    choice_num=answer['answers'], question_id=answer["question_id"]).first().text
                if gender != "Zeg ik liever niet":
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
                    img_link=answer["img_id"] if "img_id" in answer else None, # for likert
                    answers=answer["answers"] if "answers" in answer else None,
                    open_answer=answer["open_answer"] if "open_answer" in answer else None,
                    r_time=answer["response_time"] if 'response_time' in answer else None,
                    before_video=answer["before_video"])

        commit_db_session()
        return ANSWERS[201], 201


class QuizQuestions(Resource):
    """Resource that deals with retrieving scenario from database"""

    @jwt_required
    def get(self):
        """
        On a get request on the /quiz endpoint we return a quiz with questions
        :return: quiz and status 200
        """
        version = request.args.get("version")
        try:
            filename = os.path.join(current_app.static_folder,
                                    "IATs/{}.json".format(Version[version].value))                 
            return QuizFactory(filename).create_quiz(), 200
        except:
            traceback.print_exc()
            return ANSWERS[404], 404


class RandomQuiz(Resource):
    """Resource that deals with retrieving random scenario from database"""

    @jwt_required
    def get(self):
        """
        On a get request on the /random-quiz endpoint we return a random quiz with questions
        :return: random quiz and status 200
        """
        scenario = random.choice(list(Version))
        try:
            filename = os.path.join(current_app.static_folder,
                                    "IATs/{}.json".format(scenario.value))
            return QuizFactory(filename).create_quiz(), 200
        except:
            return ANSWERS[404], 404


class QuizVersions(Resource):
    """Resource that returns a mapping for the different scenarios"""

    def get(self):
        """
        On a get on the /quiz-version endpoint we return a version mapping
        :return the version mapping
        """
        ret = dict()
        for e in Version:
            ret[e.name] = e.value
        return ret

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
            if answer.question.q_type == QuestionType.open_question:
                array.append(str(answer.open_question_answer))
            else:
                array.append(str(answer.answers))
            array.append(answer.img_link)
            array.append(answer.response_time)
            array.append(answer.before_video)
            data.append(array)

        return {
            "columns": columns,
            "data": data
        }, 200


class CalculateResult(Resource):
    """
    Defines the handlers for the /dummy route
    """

    
    def get_block_information(self, block_nr, data):
        question_id = next(x["question_id"] for x in data['data'] if x["block_nr"] == block_nr)
        question = Question.query.filter_by(id=question_id).first()
        block_answers = list(map(lambda x: x["response_time"], filter(lambda x: x["block_nr"] == block_nr, data['data'])))
        return question, block_answers

    def send_email(self, res, email=None):
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
            "email": valid.validate_email
        }

        data = valid.validate(valid.read_form_data(request), validators)
        if not data:
            return ANSWERS[400], 400
        

        data = valid.read_form_data(request)


        question3, block_3_answers = self.get_block_information(3, data)
        question5, block_5_answers = self.get_block_information(5, data)
        
        t_statistic, p_value = ttest(block_3_answers, block_5_answers, equal_var=False)

        response = "No bias"

        if p_value <= 0.1:
            if t_statistic < 0:
                response = "3"
            else:
                response = "5"
        
        if 'email' in data:
            self.send_email(res=response, email=data['email'])

        return response, 200

class Dissemination(Resource):

    def get(self):
        try:
            filename = os.path.join(current_app.static_folder,
                                    "IATs/{}.json".format("dissemination"))
            return QuizFactory(filename).create_quiz(), 200
        except:
            return ANSWERS[404], 404

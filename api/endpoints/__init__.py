"""
Module that separates resources for different endpoints
"""
from flask import Blueprint
from flask_restful import Api
from .auth import Login, FreshLogin
from .dashboard import Stats, Participants, ActiveUsers
from .tokens import Protected, Refresh, ProtectedFresh
from .consent import ConsentResource, ConsentForm
from .quiz import QuizAnswers, QuizQuestions, QuizResults, QuizVersions, RandomQuiz, CalculateResult, Dissemination

bp = Blueprint("endpoint", __name__)

api = Api(bp)

api.add_resource(Login, '/login')
api.add_resource(Protected, '/protected')
api.add_resource(Refresh, '/refresh')
api.add_resource(FreshLogin, '/fresh-login')
api.add_resource(ProtectedFresh, '/protected-fresh')
api.add_resource(ConsentResource, '/submit')
api.add_resource(ConsentForm, '/form')
api.add_resource(QuizQuestions, '/quiz')
api.add_resource(QuizAnswers, '/answers')
api.add_resource(QuizResults, '/results')
api.add_resource(Stats, '/stats')
api.add_resource(ActiveUsers, '/active-users')
api.add_resource(Participants, '/participants')
api.add_resource(QuizVersions, '/quiz-versions')
api.add_resource(RandomQuiz, '/random-quiz')
api.add_resource(CalculateResult, '/calculate')
api.add_resource(Dissemination, '/iat')

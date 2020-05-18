"""
Module that separates resources for different endpoints
"""
from flask import Blueprint
from flask_restful import Api
from .auth import Login, FreshLogin
from .tokens import Protected, Refresh, ProtectedFresh
from .consent import ConsentResource

bp = Blueprint("endpoint", __name__)

api = Api(bp)

api.add_resource(Login, '/login')
api.add_resource(Protected, '/protected')
api.add_resource(Refresh, '/refresh')
api.add_resource(FreshLogin, '/fresh-login')
api.add_resource(ProtectedFresh, '/protected-fresh')
api.add_resource(ConsentResource, '/submit')

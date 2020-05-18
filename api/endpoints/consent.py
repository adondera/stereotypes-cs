from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required


class ConsentResource(Resource):
    @jwt_required
    def post(self):
        return request.get_json()

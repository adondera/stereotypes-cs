# pylint: disable=no-self-use
"""
Here we define the login logic
"""
from flask_restful import Resource
from flask import request
from flask_jwt_extended import create_refresh_token, create_access_token, jwt_refresh_token_required
from api import bcrypt
from api.endpoints.constants import ANSWERS
from api.models import User
from api.endpoints import validation as valid


class Login(Resource):
    def post(self):
        """Route for application login.
            Sends back a JSON with an access and a refresh token"""
        validators = {
            'username': valid.validate_string,
            'password': valid.validate_string
        }
        data = valid.validate(valid.read_form_data(request), validators)
        if not data:
            return ANSWERS[400], 400

        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()
        if not (user and bcrypt.check_password_hash(user.password, password)):
            return ANSWERS[403], 403

        # Use create_access_token() and create_refresh_token() to create our access and refresh tokens
        ret = {
            'access_token': create_access_token(identity=username, fresh=True),
            'refresh_token': create_refresh_token(identity=username)
        }
        return ret, 200


class FreshLogin(Resource):
    @jwt_refresh_token_required
    def post(self):
        """Route to get a fresh access token by entering credentials again
            Returns a json with a fresh access token"""
        validators = {
            'username': valid.validate_string,
            'password': valid.validate_string
        }

        data = valid.validate(valid.read_form_data(request), validators)
        if not data:
            return ANSWERS[400], 400

        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()
        if not (user and bcrypt.check_password_hash(user.password, password)):
            return ANSWERS[403], 403

        new_token = create_access_token(identity=username, fresh=True)
        ret = {
            'access_token': new_token
        }
        return ret, 200

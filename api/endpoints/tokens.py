# pylint: disable=no-self-use
"""
Here we use different endpoints protected by tokens
"""
import os
from flask import current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, \
    jwt_refresh_token_required, create_access_token, \
    fresh_jwt_required
from .constants import resp
from .quiz_factory import QuizFactory


class Protected(Resource):
    """
    Defines the handlers for the /protected route
    """

    @jwt_required
    def get(self):
        """Route that requires authentication with token.
        Can be accessed with both fresh/non-fresh tokens"""
        # Access the identity of the current user with get_jwt_identity
        current_user = get_jwt_identity()
        # return dict(logged_in_as=current_user), 200
        return resp, 200


class ProtectedSecond(Resource):
    @jwt_required
    def get(self):
        filename = os.path.join(current_app.static_folder, "IATs/gender-profession.json")
        # return current_app.static_folder
        return QuizFactory(filename).create_quiz()


class Unprotected(Resource):
    def get(self):
        return resp, 200


class Refresh(Resource):
    """
    Defines the handlers for the /refresh route
    """

    @jwt_refresh_token_required
    def post(self):
        """Route for getting an access token with a refresh token.
        Returns a json with a new access token which is not fresh"""
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        ret = {
            'access_token': new_token
        }
        return ret, 200


class ProtectedFresh(Resource):
    """
    Defines the handlers for the /protected-fresh route
    """

    @fresh_jwt_required
    def get(self):
        """Route that requires authentication with a fresh token.
        If the token is non fresh, the response status code will be 401"""
        username = get_jwt_identity()
        return dict(fresh_logged_in_as=username), 200

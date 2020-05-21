import os
import redis

from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from cloudinary.uploader import upload

import api.endpoints.validation as valid
from api.models import Consent
from .constants import ANSWERS

if os.environ["APP_SETTINGS"] == "config.StagingConfig":
    red = redis.from_url(os.environ["REDIS_URL"])
else:
    red = redis.Redis()


class ConsentResource(Resource):
    @jwt_required
    def post(self):
        return request.get_json()


class ConsentForm(Resource):
    """Route for posting consent form data."""

    def post(self):
        validators = {
            'parent': valid.validate_person_data,
            'children': valid.validate_children_data,
            'signature': valid.validate_signature
        }
        data = valid.validate(valid.read_form_data(request), validators)
        if not data:
            return ANSWERS[400], 400

        print("GOT DATA")
        print(data)

        parent = data['parent']
        signature = data['signature']

        upload_result = upload(signature)

        print("response from cloudinary: %s", upload_result)

        for child in data['children']:
            Consent.create_consent(child['firstName'], child['lastName'], parent['firstName'],
                                   parent['lastName'],
                                   signature)
            red.lpush("queue", child['firstName'])

        return ANSWERS[200], 200

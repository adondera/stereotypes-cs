# pylint: disable=no-self-use
"""
Module that deals with all logic related to consent forms
"""
import os

from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from cloudinary.uploader import upload

import api.endpoints.validation as valid
from api.models import Consent, add_to_db, Participant
from .constants import ANSWERS
from .sockets import red
from .. import socketio


class ConsentResource(Resource):
    @jwt_required
    def post(self):
        return request.get_json()


class ConsentForm(Resource):
    """Resource that deals with consent form logic"""

    def post(self):
        """
        On a post request on the /form endpoint we add the consent form to the database
        :return: If the request is valid, a 200 status code, otherwise a 400 code
        """
        validators = {
            'parent': valid.validate_person_data,
            'children': valid.validate_children_data,
            'signature': valid.validate_signature,
            'email': valid.validate_email
        }

        data = valid.validate(valid.read_form_data(request), validators)
        if not data:
            return ANSWERS[400], 400

        parent = data['parent']
        signature = data['signature']

        if os.environ['APP_SETTINGS'] != "config.TestingConfig" \
                and os.environ['APP_SETTINGS'] != "config.CITestingConfig":
            upload_result = upload(signature)
            signature = upload_result["secure_url"]

        cons = Consent.create_consent(parent_first_name=parent['firstName'], parent_last_name=parent['lastName'],
                                      signature=signature, email=data['email'])

        for child in data['children']:
            participant = Participant(first_name=child['firstName'],
                                      last_name=child['lastName'],
                                      consent_id=cons.id)
            add_to_db(participant)
            obj = {"firstName": participant.first_name,
                   "lastName": participant.last_name,
                   "id": participant.id}
            red.rpush("queue", str(obj))

        socketio.emit("free-laptops")

        return ANSWERS[200], 200

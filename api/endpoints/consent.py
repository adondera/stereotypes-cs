from flask import request, jsonify
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
    """Route for posting consent form data."""

    def post(self):
        validators = {
            'parent': valid.validate_person_data,
            'children': valid.validate_children_data,
            'signature': valid.validate_signature
        }

        # print("GOT DATA")
        # print(request.json)
        # print(request.form)

        data = valid.validate(valid.read_form_data(request), validators)
        if not data:
            return ANSWERS[400], 400



        parent = data['parent']
        signature = data['signature']

        ### Commented for testing 
        # upload_result = upload(signature)

        # print("response from cloudinary: %s", upload_result)
        cons = Consent(parent_first_name=parent['firstName'], parent_last_name=parent['lastName'],
                       signature=signature)
        add_to_db(cons)
        for child in data['children']:
            participant = Participant(first_name=child['firstName'], last_name=child['lastName'], consent_id=cons.id)
            add_to_db(participant)
            obj = {"firstName": participant.first_name,
                   "lastName": participant.last_name,
                   "id": participant.id}
            red.rpush("queue", str(obj))

        socketio.emit("free-laptops")

        return ANSWERS[200], 200

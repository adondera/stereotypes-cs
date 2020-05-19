from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from .constants import ANSWERS
from api.models import Consent
import api.endpoints.validation as valid
import cloudinary as Cloudinary

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

        upload_result = Cloudinary.upload(signature)

        print("response from cloudinary: %s", upload_result)

        for child in data['children']:
            Consent.create_consent(child['firstName'], child['lastName'], parent['firstName'], parent['lastName'],
                                   upload_result["secure_url"])

        return ANSWERS[200], 200

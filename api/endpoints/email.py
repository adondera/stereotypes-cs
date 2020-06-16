from api import mail
from flask import request
from flask_mail import Message
from flask_restful import Resource


class Email(Resource):

    def post(self):
        email = request.args.get("email")
        msg = Message('Your IAT results', recipients=[email])

        msg.body = 'Here are your IAT results!'

        mail.send(msg)

        return 200

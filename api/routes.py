from api import app, bcrypt
from api.models import User
from api import db
from flask.json import jsonify
from flask import request
from typing import List


def read_form_data(request, file_keys: List[str]=[]) -> dict:
    """Returns the request's form data as a dictionary, both in `request.form`
       and `request.files`. Importantly, it also ensures through the file_keys
       list that form data expected to be sent as a file, does not appear as
       a form key-value pair.
    """
    data = {}
    if request.json:
        data.update(request.json)
    if request.form.to_dict():
        data.update(request.form.to_dict())

    # for file_key in file_keys:
    #     data.pop(file_key, None) # should not be there as form val

    data.update(request.files.to_dict())
    if bool(data):
        return data
    return None


# Define error messages
ANSWERS = { 200: "200 OK",
            201: "201 Created",
            204: "204 No Content",
            400: "400 Bad Request",
            401: "401 Unauthorized",
            403: "403 Forbidden",
            404: "404 Not found",
            411: "411 Passwords don't match",
            422: "422 Incorrect password length",
            433: "433 Incorrect old password",
            500: "500 An internal server error occurred",
            501: "501 Not implemented",
            502: "502 Bad gateway"
          }

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route('/form', methods=['POST'])
def form():
    if request.method == 'POST':
        data = read_form_data(request)

        print("GOT DATA:")
        print(data)

        return jsonify(ANSWERS[200]), 200

    return jsonify(ANSWERS[400]), 400

@app.route('/login', methods=['POST'])
def login():
    
    data = read_form_data(request)

    print(data)

    username = data['username']
    password = data['password']
        
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify("Login successful"), 200
    
    return jsonify(ANSWERS[403], 403)


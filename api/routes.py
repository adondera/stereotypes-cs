from api import app
from api.models import User
from api import db
from flask.json import jsonify
from flask import request

## Define error messages
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
        return jsonify(ANSWERS[200]), 200

    return jsonify(ANSWERS[400]), 400


@app.route('/test/<first>/<second>')
def databasetest(first=None, second=None):
    me = User(first, second)
    db.session.add(me)
    db.session.commit()
    return "Hello %s %s" % (first, second)

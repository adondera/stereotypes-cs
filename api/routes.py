"""Server routes"""
from flask.json import jsonify
from flask import request
from flask_jwt_extended import jwt_required, jwt_refresh_token_required, create_access_token, \
    create_refresh_token, get_jwt_identity, fresh_jwt_required
from api import app, bcrypt
from api.models import User
import api.validation as valid

# Define error messages
ANSWERS = {200: "200 OK",
           201: "201 Created",
           204: "204 No Content",
           400: "400 Bad Request",
           401: "401 Unauthorized",
           403: "403 Forbidden",
           404: "404 Not found",
           500: "500 An internal server error occurred",
           501: "501 Not implemented",
           502: "502 Bad gateway"
           }


@app.route('/')
@app.route('/index')
def index():
    """Home route."""
    return "Hello, World!"


@app.route('/form', methods=['POST'])
def form():
    """Route for posting consent form data."""
    if request.method == 'POST':
        data = valid.read_form_data(request)

        print("GOT DATA:")
        print(data)

        return jsonify(ANSWERS[200]), 200

    return jsonify(ANSWERS[400]), 400


@app.route('/login', methods=['POST'])
def login():
    """Route for application login.
    Sends back a JSON with an access and a refresh token"""
    validators = {
        'username': valid.validate_string,
        'password': valid.validate_string
    }
    data = valid.validate(valid.read_form_data(request), validators)
    if not data or not data['username'] or not data['password']:
        return jsonify(ANSWERS[400]), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    if not (user and bcrypt.check_password_hash(user.password, password)):
        return jsonify(ANSWERS[403]), 403

    # Use create_access_token() and create_refresh_token() to create our access and refresh tokens
    ret = {
        'access_token': create_access_token(identity=username, fresh=True),
        'refresh_token': create_refresh_token(identity=username)
    }
    return jsonify(ret), 200


@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    """Route that requires authentication with token.
    Can be accessed with both fresh/non-fresh tokens"""
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    """Route for getting an access token with a refresh token.
    Returns a json with a new access token which is not fresh"""
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user, fresh=False)
    ret = {
        'access_token': new_token
    }
    return jsonify(ret), 200


@app.route('/fresh-login', methods=['POST'])
@jwt_refresh_token_required
def fresh_login():
    """Route to get a fresh access token by entering credentials again
    Returns a json with a fresh access token"""
    validators = {
        'username': valid.validate_string,
        'password': valid.validate_string
    }

    data = valid.validate(valid.read_form_data(request), validators)
    if not data or not data['username'] or not data['password']:
        return jsonify(ANSWERS[400]), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    if not (user and bcrypt.check_password_hash(user.password, password)):
        return jsonify(ANSWERS[403]), 403

    new_token = create_access_token(identity=username, fresh=True)
    ret = {
        'access_token': new_token
    }
    return jsonify(ret), 200


@app.route('/protected-fresh', methods=['GET'])
@fresh_jwt_required
def protected_fresh():
    """Route that requires authentication with a fresh token.
    If the token is non fresh, the response status code will be 401"""
    username = get_jwt_identity()
    return jsonify(fresh_logged_in_as=username), 200

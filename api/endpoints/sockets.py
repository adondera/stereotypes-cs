"""
Class that deals with socket communication for the queue management
"""
import os
import json
import redis
from flask_jwt_extended import jwt_required
from .. import socketio
from api import app

red = redis.from_url(app.config["REDIS_URL"])


@socketio.on('connect')
@jwt_required
def connect():
    """
    Simple function to authenticate a socket connection.
    :return: Nothing
    """
    print("Authenticated", flush=True)


@socketio.on('free')
def check_queue(message):
    """
    This function returns the first participant currently in the queue
    :param message: Message from the client
    :return: The top element in the queue, if it exists, otherwise nothing
    """
    obj = red.lpop("queue")
    if obj:
        decoded_string = obj.decode("utf-8").replace("\'", "\"")
        ret = json.loads(decoded_string)
        return ret

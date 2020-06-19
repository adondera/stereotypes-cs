"""
Class that deals with socket communication for the queue management
"""
import os
import json
import redis
from flask_jwt_extended import jwt_required
from .. import socketio

if os.environ["APP_SETTINGS"] == "config.StagingConfig" or os.environ["APP_SETTINGS"] == "config.ProductionConfig":
    red = redis.from_url(os.environ["REDIS_URL"])
elif os.environ["APP_SETTINGS"] == "config.CITestingConfig":
    red = redis.Redis(host="redis")
elif os.environ["APP_SETTINGS"] == "config.DockerConfig": 
    red = redis.Redis(host="redis") 
else:
    red = redis.Redis()


@socketio.on('connect')
@jwt_required
def connect():
    """
    Simple function to authenticate a socket connection.
    :return: Nothing
    """
    print("Authenticated", flush=True)


@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)
    return {"message": "here's a message"}


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

import os
import redis
from flask_jwt_extended import jwt_required
from .. import socketio

if os.environ["APP_SETTINGS"] == "config.StagingConfig":
    red = redis.from_url(os.environ["REDIS_URL"])
else:
    red = redis.Redis()

@socketio.on('connect')
@jwt_required
def connect():
    print("Authenticated")

@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)
    return {"message": "here's a message"}


@socketio.on('free')
def check_queue(message):
    obj = red.lpop("queue")
    print(obj)
    if obj:
        return {"child": obj.decode("utf-8")}

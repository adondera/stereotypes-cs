import os
import redis
from .. import socketio

if os.environ["APP_SETTINGS"] == "config.StagingConfig":
    red = redis.from_url(os.environ["REDIS_URL"])
else:
    red = redis.Redis()


@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)
    return {"message": "muie ba"}


@socketio.on('free')
def check_queue(message):
    obj = red.lpop("queue")
    print(obj)
    if obj:
        return {"child": obj.decode("utf-8")}

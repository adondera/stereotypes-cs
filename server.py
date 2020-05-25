from api import app, socketio

if __name__ == '__main__':
    socketio.run(app, cors_allowed_origins='*')

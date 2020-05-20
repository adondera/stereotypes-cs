"""Init file for server."""
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_socketio import SocketIO, emit

# Flask setup
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
socketio = SocketIO(app)

# Enables CORS
cors = CORS(app)

# Bcrypt setup
bcrypt = Bcrypt(app)

# JSON Access Token setup
jwt = JWTManager(app)

# Database setup
db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % app.config['POSTGRES']


@app.route('/')
@app.route('/index')
def index():
    """Home route."""
    return "Hello, World!"

@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)

from .endpoints import bp

app.register_blueprint(bp)

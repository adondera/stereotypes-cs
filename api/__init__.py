"""Init file for server."""
import os
import datetime
from flask import Flask, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_mail import Mail

# Flask setup
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

# Configure SocketIO
socketio = SocketIO(app, cors_allowed_origins='*')

# Enables CORS
cors = CORS(app)

# Bcrypt setup
bcrypt = Bcrypt(app)

# JSON Access Token setup
jwt = JWTManager(app)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=12)

# Database setup
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Email setup
app.config['MAIL_SERVER'] = 'smtp.sendgrid.net'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'apikey'
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')

mail = Mail(app)

@app.route('/')
@app.route('/index')
def index():
    """Home route."""
    return "Hello, World!"


@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.close()


from .endpoints import bp as endpoints_bp

app.register_blueprint(endpoints_bp)

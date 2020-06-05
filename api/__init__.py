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
import datetime

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
app.config['JWT_ACCESS_TOKEN_EXPIRES']=datetime.timedelta(hours=12)

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


from .endpoints import bp as endpoints_bp

app.register_blueprint(endpoints_bp)


# @app.before_request
# def before_request():
#     if not request.is_secure and 'DYNO' in os.environ and request.url.startswith('http://'):
#         url = request.url.replace('http://', 'https://', 1)
#         code = 308
#         return redirect(url, code=code)

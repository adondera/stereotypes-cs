"""Init file for server."""
import os
from flask import Flask, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

# Flask setup
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

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


@app.before_request
def before_request():
    if not request.is_secure and 'DYNO' in os.environ:
        url = request.url.replace('http://', 'https://', 1)
        code = 301
        return redirect(url, code=code)


from .endpoints import bp

app.register_blueprint(bp)

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

### Flask setup
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

### Enables CORS
cors = CORS(app)

### Bcrypt setup
bcrypt = Bcrypt(app)


### JSON Access Token setup
jwt = JWTManager(app)


### Database setup
db = SQLAlchemy(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % app.config['POSTGRES']

from api import routes

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
cors = CORS(app, resources={r"*": {"origins": "localhost"}})
db = SQLAlchemy(app)
POSTGRES = {
    'user': 'wjyyqbjfvwukln',
    'pw': 'd9194e1d96f48b0ccc04e6e26d63d4c170191e34e836f87caa3f1d4441c153e7',
    'db': 'd815qem5n7vf7a',
    'host': 'ec2-46-137-84-173.eu-west-1.compute.amazonaws.com',
    'port': '5432',
}

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES


print(os.environ['APP_SETTINGS'])
from api import routes

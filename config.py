import os
import secrets

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    PROPAGATE_EXCEPTIONS = True
    POSTGRES = {
        'user': 'feenldejtnjrfq',
        'pw': 'e2d00d48e9b46003ed379387ea37c36f27378b887ad0db3b1a3dc549c36dcddd',
        'db': 'drkct21t0o7md',
        'host': 'ec2-54-247-71-245.eu-west-1.compute.amazonaws.com',
        'port': '5432',
    }
    CLOUDINARY_URL = os.environ.get('CLOUDINARY_URL')
    SECRET_KEY = "Ud5yvQuCrh4GvYX9Mjc6VzomQA3q5K5_HSCvf0_Q6Tw"
    JWT_SECRET_KEY = "S8y0MwT_t7vf002vCYnL0Z8M9mRYpmJUPRkmnTXwN4E"

    MAIL_DEBUG = True
    MAIL_SUPPRESS_SEND = False

class ProductionConfig(Config):
    DEBUG = False
    POSTGRES = {
        'user': 'frbytifsjnfuec',
        'pw': '957f087c94717131d3623d9df525094479b3a67c7bd8143d9b568f2b90e2e38a',
        'db': 'd33riso0mvutf9',
        'host': 'ec2-54-75-246-118.eu-west-1.compute.amazonaws.com',
        'port': '5432',
    }

class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = False
    DEBUG = True
    POSTGRES = {
        'user': 'test',
        'pw': 'test',
        'db': 'test',
        'host': 'localhost',
        'port': '5432',
    }


class CITestingConfig(Config):
    TESTING = True
    POSTGRES = {
        'user': 'test',
        'pw': 'test',
        'db': 'test',
        'host': 'postgres',
        'port': '5432',
    }

import os

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
    SECRET_KEY = 'some random key'
    JWT_SECRET_KEY = 'super-secret'


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
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

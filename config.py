import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    PROPAGATE_EXCEPTIONS = True
    POSTGRES = {
        'user': 'wjyyqbjfvwukln',
        'pw': 'd9194e1d96f48b0ccc04e6e26d63d4c170191e34e836f87caa3f1d4441c153e7',
        'db': 'd815qem5n7vf7a',
        'host': 'ec2-46-137-84-173.eu-west-1.compute.amazonaws.com',
        'port': '5432',
    }
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

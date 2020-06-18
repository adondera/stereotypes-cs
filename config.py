import os
import secrets

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    PROPAGATE_EXCEPTIONS = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    CLOUDINARY_URL = os.environ.get('CLOUDINARY_URL')
    SECRET_KEY = "Ud5yvQuCrh4GvYX9Mjc6VzomQA3q5K5_HSCvf0_Q6Tw"
    JWT_SECRET_KEY = "S8y0MwT_t7vf002vCYnL0Z8M9mRYpmJUPRkmnTXwN4E"

    MAIL_DEBUG = True
    MAIL_SUPPRESS_SEND = False


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = False
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://test:test@localhost:5432/test'


class CITestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://test:test@postgres:5432/test'

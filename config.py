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
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    REDIS_URL = os.environ.get('REDIS_URL')
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
    REDIS_URL = 'redis://:@localhost:6379/0'
    SECRET_KEY = "test"
    JWT_SECRET_KEY = "test"


class CITestingConfig(TestingConfig):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://test:test@postgres:5432/test'
    REDIS_URL = 'redis://:@redis:6379/0'

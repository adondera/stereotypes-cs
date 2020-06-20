# pylint: disable=too-few-public-methods
"""
Module with different configuration options for the flask application
"""
import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    """
    Parent class for different configurations.
    Defines default values for dependencies.
    """
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


class ProductionConfig(Config):
    """
    Configuration for the production server
    """
    DEBUG = False


class StagingConfig(Config):
    """
    Configuration for the development server
    """
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    """
    Configuration for local testing
    """
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://test:test@localhost:5432/test'
    REDIS_URL = 'redis://:@localhost:6379/0'
    SECRET_KEY = "test"
    JWT_SECRET_KEY = "test"
    MAIL_SUPPRESS_SEND = True


class CITestingConfig(TestingConfig):
    """
    Configuration used for CI pipeline testing
    """
    SQLALCHEMY_DATABASE_URI = 'postgresql://test:test@postgres:5432/test'
    REDIS_URL = 'redis://:@redis:6379/0'


class DockerConfig(TestingConfig):
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:password@db:5432/testdb'
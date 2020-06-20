# pylint: disable=no-member
"""
Module that defines helper functions for the database
"""
import json

from api import db


def add_to_db(obj):
    """
    Helper method to add an object in the database.

    Parameters
    ----------
    obj : object type from the models package
        The object to be inserted into the database.

    Raises
    ------
    SQLException
        If failed to add a new user to the database. Transaction is rolled back.
    """

    try:
        db.session.add(obj)
        db.session.commit()
    except:
        db.session.rollback()
        raise


def commit_db_session():
    """
    Commits current SqlAlchemy session.

    Raises
    ------
    SQLException
        If failed to commit. Transaction is rolled back.
    """

    try:
        db.session.commit()
    except:
        db.session.rollback()
        raise


def is_jsonable(obj):
    """
    Checks if obj is JSONable (can be converted to JSON object).

    Parameters
    ----------
    obj : any
        The object/data-type we want to know if it is JSONable.

    Returns
    -----
    boolean
        True if obj is JSONable, or False if it is not.
    """

    try:
        json.dumps(obj)
        return True
    except TypeError:
        return False

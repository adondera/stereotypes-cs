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
    try:
        db.session.commit()
    except:
        db.session.rollback()
        raise


def add_to_session(obj):
    try:
        db.session.add(obj)
    except:
        db.session.rollback()
        raise


def is_jsonable(x):
    """
    Checks if x is JSONable (can be converted to JSON object).

    Parameters
    ----------
    x : any
        The object/data-type we want to know if it is JSONable.

    Returns
    -----
    boolean
        True if x is JSONable, or False if it is not.

    """
    try:
        json.dumps(x)
        return True
    except TypeError:
        return False

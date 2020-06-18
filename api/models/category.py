# pylint: disable=invalid-name, too-many-arguments, too-few-public-methods, no-member, dangerous-default-value
"""
Module for the category object in the database
"""
from .helpers import db, add_to_db
from .enums import Metacategory


class Category(db.Model):
    """
    Class that maps the Category object to
     the corresponding database table ('categories' table).

    Attributes
    ----------
    id : int , optional
        Auto-generated object id.
    name : str
        Category name.
    metacategory : Metacategory
        The metacategory of the category. (Ex: male (category) and gender (metacategory))
    questions : list of Question
        The list of questions in which this category is used.
    images : list of Image
        The list of images that belong to this category.

    Methods
    -------
    create_category(name, metacategory)
        Creates a new category and adds it into the database.

    """

    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    metacategory = db.Column(db.Enum(Metacategory), nullable=False)
    questions = db.relationship(
        "Question", secondary="questions_to_categories", lazy=True)
    images = db.relationship(
        "Image", backref=db.backref('category'), lazy=True)

    @staticmethod
    def create_category(name, metacategory):
        """
        Creates a category object and inserts it into the database

        Parameters
        ----------
        name : str
            Category's name.
        metacategory : Metacategory
            The metacategory this category belongs to.

        Returns
        -------
        cat : Category
            The category object that was created.

        """

        cat = Category(name=name, metacategory=metacategory)
        add_to_db(cat)
        return cat

    def __repr__(self):
        """The string representation of the object."""
        return '<Category id: %r>' % self.id

"""
Module that contains the image object from the database
"""
# pylint: disable=invalid-name, too-many-arguments, too-few-public-methods, no-member, dangerous-default-value
from .helpers import db, add_to_db
from .category import Category


class Image(db.Model):
    """
    Class that maps the Image object to
     the corresponding database table ('images' table).

    Attributes
    ----------
    id : int , optional
        Auto-generated object id.
    category_id : int
        The id of the category that this image belongs to.
    link : str
        The link to the location where the image is stored in the cloud.
    description : str
        A short description of the image.
    attribute : str
        The attribute describing the image. (Ex: pen)

    Methods
    -------
    create_image(link, description="", attribute="", c_id=None)
        Method that creates a new image and adds it into the database.

    """

    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(
        db.Integer, db.ForeignKey(Category.id), nullable=True)
    link = db.Column(db.Text, nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    attribute = db.Column(db.String(40), nullable=False)

    @staticmethod
    def create_image(link, description="", attribute="", c_id=None):
        """
        Creates an image object and inserts it into the database

        Parameters
        ----------
        link : str
            Link to the image location.
        description : str , optional
            A short description of the image.
        attribute : str , optional
            The attribute describing the image.
        c_id : int , optional
            The category that the images belongs to. (can be assigned at a later time)

        Returns
        -------
        img : Image
            The image object that was created.

        """

        img = Image(category_id=c_id, link=link,
                    description=description, attribute=attribute)
        add_to_db(img)
        return img

    def __repr__(self):
        """The string representation of the object."""
        return str(self.link)

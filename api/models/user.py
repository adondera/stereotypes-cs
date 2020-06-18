from .helpers import db, add_to_db
from flask_bcrypt import generate_password_hash


class User(db.Model):
    """
    Class that maps the User object to the corresponding database table ('users' table).

    Attributes
    ----------
    id : int, optional
        Auto-generated id for the User object.

    username : str
        The username credential.

    password : str
        The password credential.

    Methods
    -------
    create_user(username, password)
        Creates a new user and adds it to the database.

    """

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

    @staticmethod
    def create_user(username, password):
        """
        Method to create a new user instance in the database.

        Parameters
        ----------
        username : str
            User's username.
        password : str
            User's password.

        Returns
        -------
        user : User
            The user object that was created.

        """

        hashed_pw = generate_password_hash(password).decode('utf-8')
        user = User(username=username, password=hashed_pw)
        add_to_db(user)
        return user

    def __repr__(self):
        """The string representation of the object."""
        return '<User %r>' % self.username

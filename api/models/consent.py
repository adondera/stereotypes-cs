from .helpers import db, add_to_db


class Consent(db.Model):
    """
    Class that maps the Consent object to the corresponding database table ('consents' table).

    Attributes
    ----------
    id : int , optional
        Auto-generated object id.
    parent_first_name : str
        The first name of the parent that signs the consent.
    parent_last_name : str
        The last name of the parent that signs the consent.
    parent_email : str
        The email of the parent
    signature : str (link)
        Parent's signature (in the form of a link to the image location stored in the cloud).

    Methods
    -------
    create_consent(parent_first_name, parent_last_name, signature)
        Method that creates a new consent object and adds into the database.

    """

    __tablename__ = 'consent'

    id = db.Column(db.Integer, primary_key=True)
    parent_first_name = db.Column(db.String(40), nullable=False)
    parent_last_name = db.Column(db.String(40), nullable=False)
    parent_email = db.Column(db.String(120), nullable=True)
    signature = db.Column(db.Text(), nullable=False)

    @staticmethod
    def create_consent(parent_first_name, parent_last_name, signature, email=""):
        """
        Creates a new consent form entry in the database.

        Parameters
        ----------
        parent_first_name : str
            Parent's first name.
        parent_last_name : str
            Parent's last name.
        signature : str (link)
            Parent's signature.

        Returns
        -------
        consent : Consent
            The consent object that was created.

        """

        consent = Consent(parent_first_name=parent_first_name,
                          parent_last_name=parent_last_name,
                          signature=signature,
                          parent_email=email)
        add_to_db(consent)
        return consent

    def __repr__(self):
        """The string representation of the object."""
        return '<Consent form id: %r>' % self.id

import enum


class Gender(enum.Enum):
    """Enumeration of the choices for gender types"""

    Jongen = "Jongen"
    Meisje = "Meisje"
    Niet = "Zeg ik liever niet"


class Ethnicity(enum.Enum):
    """Enumeration of the choices for ethnicity types"""

    Nederlands = "Nederlands"
    Turks = "Turks"
    Marokkaans = "Marokkaans"
    Surinaams = "Surinaams"
    Indonesisch = "Indonesisch"
    Duits = "Duits"
    Pools = "Pools"
    Anders = "Anders"


class Metacategory(enum.Enum):
    """Enumeration of the choices for metacategories"""

    profession = "Profession"
    gender = "Gender"
    hobby = "Hobby"
    social = "Social"


class QuestionType(enum.Enum):
    """Enumeration of the choices for question types"""

    mc_single_answer = "mc_single_answer"
    mc_multiple_answer = "mc_multiple_answer"
    likert = "likert"
    binary = "binary"
    open_question = "open_question"
    information = "information"
    binary_information = "binary_information"
    finish = "finish"
    video = "video"
    notes = "researcher_notes"

    def __repr__(self):
        """The string representation of the object."""
        return str(self.value)


class ParticipantInformationType(enum.Enum):
    age = "Age"
    gender = "Gender"
    ethnicity = "Ethnicity"
    researcher_notes = "Researcher notes"


class Version(enum.Enum):
    """Enumeration of the different scenarios"""

    A = "control-social-female"
    B = "control-social-male"
    C = "control-hobby-female"
    D = "control-hobby-male"
    E = "intervention-social-female"
    F = "intervention-social-male"
    G = "intervention-hobby-female"
    H = "intervention-hobby-male"

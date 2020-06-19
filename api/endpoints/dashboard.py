# pylint: disable=no-self-use
"""Module that is used for sending data that can be shown on the admin dashboard"""
from datetime import datetime, timedelta, timezone

from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy import and_, func

from api.models import Participant, Version, Ethnicity, Consent


def all_time_participants():
    """
    Get the total number of persons that have taken the test.

    Returns
    -------
    int
        The total number of participants.
    """

    return Participant.query.filter(Participant.quiz_version.isnot(None)).count()


def today_participants():
    """
    Get the number of persons that have taken the test today.

    Returns
    -------
    int
        The number of participants who took the test today.
    """

    now = datetime.now(timezone.utc)
    today = datetime(now.year, now.month, now.day)
    return Participant.query.filter(and_(Participant.date >= today,
                                         Participant.quiz_version.isnot(None))).count()


def yesterday_participants():
    """
    Get the number of persons that have taken the test yesterday.

    Returns
    -------
    int
        The number of participants who took the test yesterday.
    """

    date = datetime.now(timezone.utc) - timedelta(days=1)
    yesterday = datetime(date.year, date.month, date.day)
    now = datetime.now(timezone.utc)
    today = datetime(now.year, now.month, now.day)
    return Participant.query.filter(and_(Participant.date >= yesterday,
                                         Participant.date < today,
                                         Participant.quiz_version.isnot(None))).count()


def yesterday_by_this_time_participants():
    """
    Get the number of persons that have taken the test until this time yesterday.

    Returns
    -------
    int
        The number of participants who took the test yesterday by this time.
    """

    yesterday_this_time = datetime.now(timezone.utc) - timedelta(days=1)
    yesterday_00 = datetime(yesterday_this_time.year,
                            yesterday_this_time.month,
                            yesterday_this_time.day)

    return Participant.query.filter(and_(Participant.date >= yesterday_00,
                                         Participant.date <= yesterday_this_time,
                                         Participant.quiz_version.isnot(None))).count()


def last_hour_participants():
    """
    Get the number of persons that have taken the test in the last hour.

    Returns
    -------
    int
        The number of participants who took the test in the last hour.
    """

    last_hour = datetime.now(timezone.utc) - timedelta(hours=1)
    return Participant.query.filter(and_(Participant.date >= last_hour,
                                         Participant.quiz_version.isnot(None))).count()


def version_distribution():
    """
    Get the number of participants for each version of the test.

    Returns
    -------
    JSON
        The version name and number of persons who had that version.
    """

    data = []
    for version in Version:
        num_part = Participant.query.filter(Participant.quiz_version == version).count()

        version_obj = {
            'version_name': version.value,
            'num_participants': num_part
        }

        data.append(version_obj)
    return data


def gender_distribution():
    """
    Get the distribution of participants per gender.

    Returns
    -------
    JSON
        The gender and number of persons who have this gender.
    """

    data = []
    results = Participant.query.filter(Participant.quiz_version.isnot(None)) \
        .with_entities(Participant.gender, func.count(Participant.gender)) \
        .group_by(Participant.gender).all()

    num_null = 0
    for res in results:
        if res.gender is not None:

            gender_obj = {
                'gender': res.gender,
                'number': res[1]
            }

            data.append(gender_obj)
        else:
            num_null += 1

    # add not known genders count
    data.append({
        'gender': "Not known",
        'number': num_null
    })

    return data


def ethnicity_distribution():
    """
    Get the distribution of participants per ethnicity.
    If a person has multiple ethnicities they will be counted for each individual ethnicity.

    Returns
    -------
    JSON
       The ethnicity and number of persons who have this ethnicity.
    """

    data = []
    for ethnicity in Ethnicity:
        num = Participant.query.filter(Participant.ethnicity.any(ethnicity.name)).count()

        ethnicity_obj = {
            'ethnicity': ethnicity.name,
            'number': num
        }

        data.append(ethnicity_obj)

    return data


def avg_age():
    """
    Get the average age of the persons who have taken the test.

    Returns
    -------
    int
       The average age amongst the participants.
    """

    avg = Participant.query.filter(Participant.quiz_version.isnot(None)) \
        .with_entities(func.avg(Participant.age)).one()[0]
    return float(avg) if avg is not None else None


def unfinished_tests():
    """
    Get the number of the persons who have signed the consent but did not take the test.

    Returns
    -------
    int
        The number of persons who did not complete the test (with consent signed).
    """

    num = Participant.query.filter(Participant.quiz_version.is_(None)).count()
    return num


class Stats(Resource):
    """Resource that deals with retrieving statistics about participants"""

    @jwt_required
    def get(self):
        """
        On a get request on the /stats endpoint we return an object with statistics
        :return: If the request is valid, the statistics JSON object and code 200
        """

        data = {

            'num_of_participants': {
                'all_time': all_time_participants(),
                'today': today_participants(),
                'yesterday': yesterday_participants(),
                'yesterday_by_this_time': yesterday_by_this_time_participants(),
                'last_hour': last_hour_participants()
            },

            'started_but_not_completed': unfinished_tests(),

            'average_participant_age': avg_age(),

            'version_distribution': version_distribution(),

            'gender_distribution': gender_distribution(),

            'ethnicity_distribution': ethnicity_distribution()
        }

        return data, 200


class ActiveParticipants(Resource):
    """Resource that deals with retrieving the names of active participants (last hour)"""

    @jwt_required
    def get(self):
        """
        On a get request on the /active-participants endpoint
        we return the names of current participants
        :return: If the request is valid, the JSON object and code 200
        """

        last_hour = datetime.now(timezone.utc) - timedelta(hours=1)
        result = Participant.query.filter(Participant.date >= last_hour).all()

        active_participants = []
        for res in result:
            data = {
                'name': res.first_name + " " + res.last_name,
                'finished': res.quiz_version is not None
            }
            active_participants.append(data)

        return active_participants, 200


class Participants(Resource):
    """Resource that deals with retrieving participants data from database"""

    @jwt_required
    def get(self):
        """
        On a get request on the /participants endpoint we return
        all the participants stored (who completed the test).
        :return: If the request is valid, a JSON object with the participants and code 200
        """

        columns = ["Participant Name", "Parent's email", "Age", "Gender",
                   "Ethnicities", "Test Version", "Test date", "Notes"]
        data = []
        for participant in Participant.query.filter(Participant.quiz_version.isnot(None)).all():
            array = []
            parent = Consent.query.filter_by(id=participant.consent_id).first()

            array.append(participant.first_name + " " + participant.last_name)
            array.append(parent.parent_email)
            array.append(str(participant.age))
            array.append(participant.gender)
            array.append(str(participant.ethnicity))
            array.append(participant.quiz_version.value)
            array.append(str(participant.date))
            array.append(participant.researcher_notes)

            data.append(array)

        return {
            "columns": columns,
            "data": data
        }, 200

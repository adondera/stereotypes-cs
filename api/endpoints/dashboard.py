# pylint: disable=no-self-use
from datetime import datetime, timedelta

from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy import and_, func

from api.models import Participant, Version, Ethnicity


def all_time_participants():
    return Participant.query.count()


def today_participants():
    today = datetime(datetime.today().year, datetime.today().month, datetime.today().day)
    return Participant.query.filter(Participant.date >= today).count()


def yesterday_participants():
    date = datetime.today() - timedelta(days=1)
    yesterday = datetime(date.year, date.month, date.day)
    today = datetime(datetime.today().year, datetime.today().month, datetime.today().day)
    return Participant.query.filter(and_(Participant.date >= yesterday,
                                         Participant.date < today)).count()


def yesterday_by_this_time_participants():
    yesterday_this_time = datetime.today() - timedelta(days=1)
    yesterday_00 = datetime(yesterday_this_time.year, yesterday_this_time.month, yesterday_this_time.day)

    return Participant.query.filter(and_(Participant.date >= yesterday_00),
                                    Participant.date <= yesterday_this_time).count()


def last_hour_participants():
    last_hour = datetime.today() - timedelta(hours=1)
    return Participant.query.filter(Participant.date >= last_hour).count()


def version_distribution():
    data = []
    for version in Version:
        num_participants = Participant.query.filter(Participant.quiz_version == version.name).count()

        version_obj = {
            'version_name': version.name,
            'num_participants': num_participants
        }

        data.append(version_obj)
    return data


def gender_distribution():
    data = []
    results = Participant.query.with_entities(Participant.gender, func.count(Participant.gender)) \
        .group_by(Participant.gender).all()

    for res in results:
        gender = "Not known"
        if res.gender is not None:
            gender = res.gender.name

        gender_obj = {
            'gender': gender,
            'number': res[1]
        }

        data.append(gender_obj)

    return data


def ethnicity_distribution():
    data = []

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
    avg = Participant.query.with_entities(func.avg(Participant.age)).one()[0]
    return float(avg)


class Stats(Resource):

    @jwt_required
    def get(self):

        data = {

            'num_of_participants': {
                'all_time': all_time_participants(),
                'today': today_participants(),
                'yesterday': yesterday_participants(),
                'yesterday_by_this_time': yesterday_by_this_time_participants(),
                'last_hour': last_hour_participants()
            },

            'average_participant_age': avg_age(),

            'version_distribution': version_distribution(),

            'gender_distribution': gender_distribution(),

            'ethnicity_distribution': ethnicity_distribution()
        }

        gender_distribution()
        return data, 200

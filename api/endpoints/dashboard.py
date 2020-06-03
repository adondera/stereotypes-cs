# pylint: disable=no-self-use
from datetime import datetime, timedelta

from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy import extract, and_

from api.endpoints.constants import ANSWERS
from api.models import Participant


class Stats(Resource):

    #@jwt_required
    def get(self):

        data = {

            'num_of_participants': {
                'all_time': self.all_time_participants(),
                'today': self.today_participants(),
                'yesterday': self.yesterday_participants(),
                'yesterday_by_this_time': self.yesterday_by_this_time_participants(),
                'last_hour': self.last_hour_participants()
            },

            'version_distribution': self.version_distribution
        }

        self.yesterday_participants()
        return data, 200


    def all_time_participants(self):
        return Participant.query.count()

    def today_participants(self):
        today = datetime(datetime.today().year, datetime.today().month, datetime.today().day)
        return Participant.query.filter(Participant.date >= today).count()

    def yesterday_participants(self):
        date = datetime.today() - timedelta(days=1)
        yesterday = datetime(date.year, date.month, date.day)
        today = datetime(datetime.today().year, datetime.today().month, datetime.today().day)
        return Participant.query.filter(and_(Participant.date >= yesterday,
                                             Participant.date < today)).count()

    def yesterday_by_this_time_participants(self):
        yesterday_this_time = datetime.today() - timedelta(days=1)
        yesterday_00 = datetime(yesterday_this_time.year, yesterday_this_time.month, yesterday_this_time.day)

        return Participant.query.filter(and_(Participant.date >= yesterday_00),
                                        Participant.date <= yesterday_this_time).count()

    def last_hour_participants(self):
        last_hour = datetime.today() - timedelta(hours=1)
        return Participant.query.filter(Participant.date >= last_hour).count()

    def group_distribution(self):
        data = []
        # for version in :
        #     num = Participant.query.filter(Participant.version == version).count()
        #     data.append(num)

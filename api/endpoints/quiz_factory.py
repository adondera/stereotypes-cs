import json, random

from api.models import *
from sqlalchemy import or_


class QuizFactory:

    def __init__(self, filename):
        with open(filename) as f:
            self.data = json.load(f)
            self.response = []
            self.gender_profession = IATFactory(self.data["gender_profession"]).create_iat()
            self.social_profession = IATFactory(self.data["social_profession"]).create_iat()
            self.hobby_profession = IATFactory(self.data["hobby_profession"]).create_iat()
            self.eat = EATFactory(self.data["eat"]).create_eat()
            self.video = VideoFactory(self.data['video']).create_video()
            self.demographics = DemographicsFactory(self.data['demographics']).create_demographics()

    def create_quiz(self):
        self.response.extend(self.gender_profession)
        self.response.extend(self.eat)
        self.response.extend(self.video)
        # self.response.extend(self.eat)
        self.response.extend(self.demographics)
        # self.response.append({
        #     "q_type": QuestionType.finish.name,
        #     "title": "Ending",
        #     "text": "Thank you for participating"
        # })
        return self.response


class VideoFactory:

    def __init__(self, data):
        self.data = data

    def create_video(self):
        videos = Question.query.filter_by(q_type=QuestionType.video).all()
        return random.choice(videos).make_response()


class DemographicsFactory:

    def __init__(self, data):
        self.data = data
        self.response = []

    def create_demographics(self):
        for q_id in self.data:
            self.response.extend(Question.query.filter_by(id=q_id).first().make_response())
        return self.response


class EATFactory:

    def __init__(self, data):
        self.data = data
        self.response = []

    def create_eat(self):
        iat_explanation = {
            "q_type": QuestionType.information.name,
            "title": "Information",
            "header": "Explicit IAT",
            "text":
            "In the following minutes you will be shown several statements. Please indicate how much you agree with the statement",
        }
        self.response.append(iat_explanation)
        for q_id in self.data:
            self.response.extend(Question.query.filter_by(id=q_id).first().make_response())
        return self.response


class IATFactory:

    def __init__(self, data):
        self.data = data
        self.response = []

    def create_iat(self):
        for phase in self.data:
            self.load_phase(phase)

        return self.response

    def load_phase(self, phase):
        self.response.append({
            "q_type": QuestionType.information.name,
            "title": "Information",
            "header": "Gender profession IAT",
            "text": self.create_guide_text(phase)
        })

        questions = list((map(lambda x: {
            "id": x.id,
            "left": list(map(lambda y: y['id'], x.as_dict()['categories_left'])),
            "right": list(map(lambda y: y['id'], x.as_dict()['categories_right']))
        }, Question.query.filter_by(q_type=QuestionType.binary).all())))

        questions = list(
            filter(lambda x: x['left'] == phase['left_categ'] and x['right'] == phase['right_categ'], questions))

        assert len(questions) <= 1, "Should have at most one result"

        if (len(questions) == 0):
            self.response.extend(self.create_new_phase(phase).make_response())
            return

        self.response.extend(Question.query.filter_by(id=questions[0]['id']).first().make_response())

    def create_new_phase(self, phase):
        images = Image.query.filter(
            or_(Image.category_id.in_(phase['left_categ']), Image.category_id.in_((phase['right_categ'])))).all()
        q = Question(text="", q_type=QuestionType.binary, images=images)
        add_to_db(q)

        for cl in phase['left_categ']:
            q_to_c = Question_to_category(q_id=q.id, c_id=cl, is_left=True)
            add_to_db(q_to_c)

        for cr in phase['right_categ']:
            q_to_c = Question_to_category(q_id=q.id, c_id=cr, is_left=False)
            add_to_db(q_to_c)
        
        return q

    def create_guide_text(self, phase):
        left = map(lambda x: x.name, Category.query.filter(Category.id.in_(phase['left_categ'])).all())
        string_left = '&'.join(left)
        right = map(lambda x: x.name, Category.query.filter(Category.id.in_(phase['right_categ'])).all())
        string_right = '&'.join(right)
        return """Press the E key for the images that belong to the categories ({left}), or press the I key for the \
images that belong to the categories ({right})""" \
            .format(left=string_left, right=string_right)

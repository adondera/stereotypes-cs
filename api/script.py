"""Populates the database with data (categories, images, questions)"""
from api.models import Category, Metacategory, Image, Question, \
    QuestionType, QuestionChoice, Ethnicity, Gender, User, DemographicsType

from api import db


def populate():
    db.session.close()
    db.drop_all()
    db.create_all()

    User.create_user("admin", "admin")

    """Method that populates the databse with data"""
    c_male = Category.create_category(name="Jongen", metacategory=Metacategory.gender)
    c_female = Category.create_category(name="Meisje", metacategory=Metacategory.gender)
    c_programmer = Category.create_category(name="Programmeur", metacategory=Metacategory.profession)
    c_writer = Category.create_category(name="Schrijver", metacategory=Metacategory.profession)
    c_alone = Category.create_category(name="Alleen", metacategory=Metacategory.social)
    c_together = Category.create_category(name="Samen", metacategory=Metacategory.social)
    c_gaming = Category.create_category(name="Gamen", metacategory=Metacategory.hobby)
    c_tennis = Category.create_category(name="Tennis", metacategory=Metacategory.hobby)

    male_images = [
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192602/Gender/gender_male_1_g2lh5p.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192602/Gender/gender_male_2_sa8fgj.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192601/Gender/gender_male_3_puyy0g.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192601/Gender/gender_male_4_xdz0j1.png']

    female_images = [
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192601/Gender/gender_female_1_mkeatm.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192601/Gender/gender_female_2_jpeyr0.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192601/Gender/gender_female_3_xtzyxj.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192601/Gender/gender_female_4_ns0xph.png'
    ]

    programmer_images = [
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192877/Profession/profession_programmer_1_o8cjwc.png",
         "App"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192877/Profession/profession_programmer_2_stjskj.png",
         "Laptop"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192877/Profession/profession_programmer_3_bu0poe.png",
         "Keyboard"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192877/Profession/profession_programmer_4_meu8oc.png",
         "Website")
    ]

    writer_images = [
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192877/Profession/profession_writer_1_dqzbjn.png",
         "Newspaper"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192879/Profession/profession_writer_2_faw9zt.png",
         "Papers"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192877/Profession/profession_writer_3_cwj9lk.png",
         "Pen"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192878/Profession/profession_writer_4_l2boup.png",
         "Book")
    ]

    gaming_images = [
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193001/Hobby/hobby_gaming_1_f29wwk.png",
         "Game Controller"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192999/Hobby/hobby_gaming_2_rinzcc.png",
         "Game Controller"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591192999/Hobby/hobby_gaming_3_xqy21o.png",
         "Game Controller"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193001/Hobby/hobby_gaming_4_bkrsbg.png",
         "Game Controller")
    ]

    tenis_images = [
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193001/Hobby/hobby_tennis_1_qg4dgy.png", "Net"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193001/Hobby/hobby_tennis_2_skoohe.png", "Racket"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193001/Hobby/hobby_tennis_3_khrqoj.png", "Shoe"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193001/Hobby/hobby_tennis_4_npdibp.png", "Ball")
    ]

    alone_images = [
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193132/Social/social_alone_1_vmistb.png", "Alone"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193132/Social/social_alone_2_uwyq0o.png", "Alone"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193133/Social/social_alone_3_leru5w.png", "Alone"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193132/Social/social_alone_4_ffzago.png", "Alone")
    ]

    together_images = [
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193133/Social/social_together_1_thdegt.png",
         "Together"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193133/Social/social_together_2_oaarip.png",
         "Together"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193134/Social/social_together_3_zji8l5.png",
         "Together"),
        ("https://res.cloudinary.com/hctr0xmqp/image/upload/v1591193134/Social/social_together_4_h4oz8h.png",
         "Together")
    ]

    for link in male_images:
        Image.create_image(link=link, description="Man",
                           attribute='man standing', c_id=c_male.id)

    for link in female_images:
        Image.create_image(link=link, description='Girl',
                           attribute='girl standing', c_id=c_female.id)

    create_images(programmer_images, c_programmer.id)
    create_images(writer_images, c_writer.id)
    create_images(gaming_images, c_gaming.id)
    create_images(tenis_images, c_tennis.id)
    create_images(alone_images, c_alone.id)
    create_images(together_images, c_together.id)

    # likert
    create_likert("Ik ben sociaal\n"
                  "Als je sociaal bent maak je makkelijk vrienden en werk je graag samen")
    create_likert("Ik ben graag de beste")
    create_likert("Ik ben gek op computers")
    create_likert("Ik wil later programmeur worden")
    create_likert("Programmeurs zijn sociaal"""
                  "Als je sociaal bent maak je makkelijk vrienden en werk je graag samen")
    create_likert("Programmeurs houden ervan om de beste te zijn")
    create_likert("Programmeurs zijn gek op computers en hebben weinig andere hobby’s")
    create_likert("Programmeur zijn, dat is een beroep voor mannen")
    create_likert("Programmeur zijn, dat is een beroep voor vrouwen")
    create_likert("Schrijvers zijn sociaal"""
                  "Als je sociaal bent maak je makkelijk vrienden en werk je graag samen")
    create_likert("Schrijvers houden ervan om de beste te zijn")
    create_likert("Schrijvers zijn gek op computers en hebben weinig andere hobby’s")
    create_likert("Schrijver zijn, dat is een beroep voor mannen")
    create_likert("Schrijver zijn, dat is een beroep voor vrouwen")

    Question.create_question(q_type=QuestionType.open_question, text="Wat doet een programmeur?")

    video = Image.create_image(link="7CVtTOpgSyY", description='role model intervention video',
                               attribute='video')

    # video_question
    Question.create_question(
        q_type=QuestionType.video,
        text="You are going to watch a video about stereotypes "
             "in Computer Science. Click play when ready.",
        images=[video]
    )

    mc_1 = Question.create_question(q_type=QuestionType.mc_single_answer, text="Hoe oud ben je?",
                                    demographics=DemographicsType.age)
    for i in range(6, 19):
        QuestionChoice.create_choice(choice_num=i - 5, q_id=mc_1.id, text=str(i))
    QuestionChoice.create_choice(choice_num=14, q_id=mc_1.id, text="Anders")

    mc_2 = Question.create_question(q_type=QuestionType.mc_multiple_answer,
                                    text="Wat is jouw achtergrond? Er zijn meerdere antwoorden mogelijk.",
                                    demographics=DemographicsType.ethnicity)
    for i, ethnicity in enumerate(Ethnicity.__iter__(), 1):
        QuestionChoice.create_choice(choice_num=i, q_id=mc_2.id, text=ethnicity.value)

    mc_3 = Question.create_question(q_type=QuestionType.mc_single_answer,
                                    text="Ik voel me een ...",
                                    demographics=DemographicsType.gender)
    for i, gender in enumerate(Gender.__iter__(), 1):
        QuestionChoice.create_choice(choice_num=i, q_id=mc_3.id, text=gender.value)


def create_images(link_array, c_id):
    for link in link_array:
        Image.create_image(link=link[0], description='',
                           attribute=link[1], c_id=c_id)


def create_likert(text):
    Question.create_question(q_type=QuestionType.likert,
                             text=text)

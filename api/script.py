from api.models import *


def populate():
    c_male = Category.create_category(name="male", metacategory=Metacategory.gender)
    c_female = Category.create_category(name="female", metacategory=Metacategory.gender)

    male_images = [
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1590676331/VHTO-02-04_yn2mat.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1590676331/VHTO-02-03_lwqw6g.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1590676331/VHTO-02-01_i2gkp6.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1590676331/VHTO-02-02_fuj3mz.png']

    female_images = [
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1590676331/VHTO-01-01_hldwxr.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1590676331/VHTO-01-02_nsazzg.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1590676331/VHTO-01-03_ao8hlr.png',
        'https://res.cloudinary.com/hctr0xmqp/image/upload/v1590676331/VHTO-01-04_bpq6x2.png'
    ]

    for link in male_images:
        img = Image.create_image(link=link, description="image of a man", attribute='man standing', c_id=c_male.id)

    for link in female_images:
        img = Image.create_image(link=link, description='image of a girl', attribute='girl standing', c_id=c_female.id)

    likert1 = Question.create_question(q_type=QuestionType.likert, text="Programming is a profession for men")
    likert2 = Question.create_question(q_type=QuestionType.likert, text="Programming is a profession for women")

    video = Image.create_image(link="7CVtTOpgSyY", description='role model intervention video', attribute='video')
    videoQuestion = Question.create_question(q_type=QuestionType.video,
                                             text="You are going to watch a video about stereotypes "
                                                  "in Computer Science. Click play when ready.",
                                             images=[video])

    mc_1 = Question.create_question(q_type=QuestionType.mc_single_answer, text="What is your age?")
    for i in range(6, 19):
        QuestionChoice.create_choice(choice_num=i - 5, q_id=mc_1.id, text=str(i))

    mc_2 = Question.create_question(q_type=QuestionType.mc_multiple_answer, text="What is your ethnicity?")
    for e in Ethnicity:
        QuestionChoice.create_choice(choice_num=e.value, q_id=mc_2.id, text=e.name)

    mc_3 = Question.create_question(q_type=QuestionType.mc_single_answer, text="What is your gender?")
    for g in Gender:
        QuestionChoice.create_choice(choice_num=g.value, q_id=mc_3.id, text=g.name)

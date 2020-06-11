const initialStore = {
  quizReducer: {
    answers: []
  },
  appReducer: {
    quizIndex: 0,
    quizData: [
      // {
      //   id: 69,
      //   type: 1,
      //   title: 'Binary question',
      //   textLeft: 'Programmer',
      //   textRight: 'Writer',
      //   image: 'https://i.imgur.com/9GIFW9f.jpg',
      //   correctAnswer: 'right',
      // },

        //binary question
        {
            "is_active": true,
            "text": "",
            "information": null,
            "q_type": "binary",
            "id": 22,
            "categories_left": [
                {
                    "id": 3,
                    "name": "Programmeur"
                }
            ],
            "categories_right": [
                {
                    "id": 4,
                    "name": "Schrijver"
                }
            ],
            "image": {
                "link": "https://res.cloudinary.com/hctr0xmqp/image/upload/v1591276504/Profession/profession_programmer_4_xbviey.png",
                "category": "Programmeur"
            }
        },




      // {
      //   type: 4,
      //   title: 'Information',
      //   header: 'Gender profession IAT',
      //   body:
      //     'In the following minutes you will see several images with two words each. One on the right, and the other on the left. Please choose the word you consider aproppriate: Left word (key E), Right word (key I). Please click on Next when ready',
      // },
        {
            "q_type": "information",
            "text": "Leuk dat je mee doet aan dit onderzoek! Als je iets niet begrijpt tijdens het onderzoek, of als je wilt stoppen, steek dan je hand op. We komen dan zo snel mogelijk naar je toe om je te helpen."
        },



        //likert
      // {
      //   id: 96,
      //   type: 2,
      //   title: 'Likert Scale',
      //   text: 'Programming is a profession for men',
      //   image: 'https://i.imgur.com/9GIFW9f.jpg',
      // },
        {
            "is_active": true,
            "text": "Programmeurs zijn sociaal. Als je sociaal bent maak je makkelijk vrienden en werk je graag samen",
            "information": null,
            "q_type": "likert",
            "id": 5,
            "choices": []
        },







        {
            "text": "Wat nationality is your mother?.",
            // "q_type": "mc_multiple_answer",
            type: 7,
            "id": 18,
            "choices": [
                {
                    "choice_num": 1,
                    "text": "Nederlands"
                },
                {
                    "choice_num": 2,
                    "text": "Turks"
                },
                {
                    "choice_num": 3,
                    "text": "Marokkaans"
                },
                {
                    "choice_num": 4,
                    "text": "Surinaams"
                },
                {
                    "choice_num": 5,
                    "text": "Indonesisch"
                },
                {
                    "choice_num": 6,
                    "text": "Duits"
                },
                {
                    "choice_num": 7,
                    "text": "Pools"
                },
                {
                    "choice_num": 8,
                    "text": "Anders"
                }
            ]
        },




    //   {
    //     id: 420,
    //     "type": 6,
    //     "title": "Multiple Choice",
    //     "text": "What is your age",
    //     "options": [
    //         "6",
    //         "7",
    //         "8",
    //         "9",
    //         "10"
    //     ]
    // },
        {
            "is_active": true,
            "text": "Hoe oud ben je?",
            "q_type": "mc_single_answer",
            "id": 17,
            "choices": [
                {
                    "choice_num": 1,
                    "text": "6"
                },
                {
                    "choice_num": 2,
                    "text": "7"
                },
                {
                    "choice_num": 3,
                    "text": "8"
                },
                {
                    "choice_num": 4,
                    "text": "9"
                },
                {
                    "choice_num": 5,
                    "text": "10"
                },
                {
                    "choice_num": 6,
                    "text": "11"
                },
                {
                    "choice_num": 7,
                    "text": "12"
                },
                {
                    "choice_num": 8,
                    "text": "13"
                },
                {
                    "choice_num": 9,
                    "text": "14"
                },
                {
                    "choice_num": 10,
                    "text": "15"
                },
                {
                    "choice_num": 11,
                    "text": "16"
                },
                {
                    "choice_num": 12,
                    "text": "17"
                },
                {
                    "choice_num": 13,
                    "text": "18"
                },
                {
                    "choice_num": 14,
                    "text": "Anders"
                }
            ]
        },

      { type: 5 },
    ],
    quizIsLoaded: true,
    quizIsLoading: true,
    quizIsFinished: false,
  },
};

export default initialStore;

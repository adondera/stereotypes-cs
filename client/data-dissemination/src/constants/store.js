const initialStore = {
  quizReducer: {
    answers: []
  },
  appReducer: {
    quizIndex: 0,
    quizData: [
        {
            "is_active":true,
            "text":"",
            "information":null,
            "q_type":"binary",
            "id":22,
            "categories_left":[
                {
                    "id":3,
                    "name":"Programmeur"
                }
            ],
            "categories_right":[
                {
                    "id":4,
                    "name":"Schrijver"
                }
            ],
            "image":{
                "link":"https://res.cloudinary.com/hctr0xmqp/image/upload/v1591276504/Profession/profession_programmer_4_xbviey.png",
                "category":"Programmeur"
            }
        },
        {
            "is_active":true,
            "text":"Programmeurs zijn sociaal. Als je sociaal bent maak je makkelijk vrienden en werk je graag samen",
            "information":null,
            "q_type":"likert",
            "id":5,
            "choices":[

            ]
        },
        {
            "text":"Wat nationality is your mother?.",
            "q_type":"mc_multiple_answer",
            "id":18,
            "choices":[
                {
                    "choice_num":1,
                    "text":"Nederlands"
                },
                {
                    "choice_num":2,
                    "text":"Turks"
                },
                {
                    "choice_num":3,
                    "text":"Marokkaans"
                },
                {
                    "choice_num":4,
                    "text":"Surinaams"
                },
                {
                    "choice_num":5,
                    "text":"Indonesisch"
                },
                {
                    "choice_num":6,
                    "text":"Duits"
                },
                {
                    "choice_num":7,
                    "text":"Pools"
                },
                {
                    "choice_num":8,
                    "text":"Anders"
                }
            ]
        },
        {
            "is_active":true,
            "text":"Hoe oud ben je?",
            "q_type":"mc_single_answer",
            "id":17,
            "choices":[
                {
                    "choice_num":1,
                    "text":"6"
                },
                {
                    "choice_num":2,
                    "text":"7"
                },
                {
                    "choice_num":3,
                    "text":"8"
                },
                {
                    "choice_num":4,
                    "text":"9"
                },
                {
                    "choice_num":5,
                    "text":"Anders"
                }
            ]
        },
        {
            "q_type":"finish",
            "title":"Einde",
            "text":"Bedankt voor het meedoen aan dit onderzoek! We willen je vragen om niet te verklappenwat je precies gedaan hebt aan andere kinderen die misschien nog mee willen doen.\nSteek je hand op, dan komt er zo snel mogelijk iemand naar je toe."
        }
    ],
    quizIsLoaded: true,
    quizIsLoading: true,
    quizIsFinished: false,
  },
};

export default initialStore;

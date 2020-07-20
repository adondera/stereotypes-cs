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
                    "id":99,
                    "name":"Groente"
                }
            ],
            "categories_right":[
                {
                    "id":100,
                    "name":"Fruit"
                }
            ],
            "image":{
                "link":"https://www.weightwatchers.com/nl/sites/nl/files/styles/wwvs_default_image/public/article_masthead/fruit_720x370_0.jpg",
                "category":"Fruit"
            }
        },
        {
            "is_active":true,
            "text":"",
            "information":null,
            "q_type":"binary",
            "id":22,
            "categories_left":[
                {
                    "id":99,
                    "name":"Groente"
                }
            ],
            "categories_right":[
                {
                    "id":100,
                    "name":"Fruit"
                }
            ],
            "image":{
                "link":"https://www.groenkennisnet.nl/upload_mm/1/b/d/aacdaa31-9ccd-4c5a-aa76-86fe107452a7_shutterstock_553662235_groente_kleurrijk_86743ae7_530x357.jpg",
                "category":"Groente"
            }
        },
        // {
        //     "text0": "Je gaat zo verschillende plaatjes zien die je naar links of naar rechts moet verplaatsen. Doe dit zo snel mogelijk en probeer zo min mogelijk fouten te maken. Mocht je toch een foutje maken, geen probleem! Je mag het dan nog een keer proberen.",
        //     "text1": "Hieronder zie je plaatjes van een programmeur. Deze ga je zo naar links verplaatsen. Dit doe je door op de ‘e’ te tikken op het toetsenbord.",
        //     "text2": "Ook ga je plaatjes zien van een schrijver. Deze ga je zo naar rechts verplaatsen. Dit doe je door op de ‘i’ te tikken op het toetsenbord.",
        //     "q_type": "finish",
        //     "text3": "Zet je linker wijsvinger op de ‘e’, en je rechter wijsvinger op de ‘i’, zo kun je snel plaatjes verplaatsen! Ben je er klaar voor? Druk dan op volgende.",
        //     "images0": [
        //         "https://res.cloudinary.com/hctr0xmqp/image/upload/v1591276505/Profession/profession_programmer_1_c6pvby.png",
        //         "https://res.cloudinary.com/hctr0xmqp/image/upload/v1591276504/Profession/profession_programmer_2_rbcfov.png",
        //         "https://res.cloudinary.com/hctr0xmqp/image/upload/v1591276504/Profession/profession_programmer_3_cjwqsw.png",
        //         "https://res.cloudinary.com/hctr0xmqp/image/upload/v1591276504/Profession/profession_programmer_4_xbviey.png"
        //     ],
        //     "images1": [
        //         "https://res.cloudinary.com/hctr0xmqp/image/upload/v1591276504/Profession/profession_writer_1_o8xzue.png",
        //         "https://res.cloudinary.com/hctr0xmqp/image/upload/v1591276504/Profession/profession_writer_2_mmpdnx.png",
        //         "https://res.cloudinary.com/hctr0xmqp/image/upload/v1591276505/Profession/profession_writer_3_qyl8aq.png",
        //         "https://res.cloudinary.com/hctr0xmqp/image/upload/v1591276505/Profession/profession_writer_4_tbvw0b.png"
        //     ]
        // }
        {
            "q_type":"finish",
            "title":"Einde",
            "text":"Bedankt voor het meedoen aan dit onderzoek! We willen je vragen om niet te verklappen wat je precies gedaan hebt aan andere kinderen die misschien nog mee willen doen.\nSteek je hand op, dan komt er zo snel mogelijk iemand naar je toe."
        }
    ],
    quizIsLoaded: true,
    quizIsLoading: true,
    quizIsFinished: false,
    quizResultAvailable: false,
    quizResultLoading: false,
    result: null
  },
};

export default initialStore;

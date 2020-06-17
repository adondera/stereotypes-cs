"""
This module defines commonly-used constants
"""
# Define error messages
ANSWERS = {200: "200 OK",
           201: "201 Created",
           204: "204 No Content",
           400: "400 Bad Request",
           401: "401 Unauthorized",
           403: "403 Forbidden",
           404: "404 Not found",
           500: "500 An internal server error occurred",
           501: "501 Not implemented",
           502: "502 Bad gateway"
           }

block_start_text = [

    {"text0": "Je gaat zo verschillende plaatjes zien die je naar links of naar rechts moet verplaatsen. Doe dit zo "
              "snel mogelijk en probeer zo min mogelijk fouten te maken. Mocht je toch een foutje maken, geen "
              "probleem! Je mag het dan nog een keer proberen.",

     "text1": "Hieronder zie je plaatjes van een {}. Deze ga je zo naar links verplaatsen. Dit doe je door op "
              "de ‘e’ te tikken op het toetsenbord.",

     "text2": "Ook ga je plaatjes zien van een {}. Deze ga je zo naar rechts verplaatsen. Dit doe je door op "
              "de ‘i’ te tikken op het toetsenbord."
     },

    {"text0": "Goed gedaan! We gaan het nog een keer doen, maar nu met nieuwe plaatjes.",

     "text1": "Hieronder zie je plaatjes van een {}. Deze ga je zo naar links verplaatsen. Dit doe je door op "
              "de ‘e’ te tikken op het toetsenbord.",

     "text2": "Ook ga je plaatjes zien van een {}. Deze ga je zo naar rechts verplaatsen. Dit doe je door op "
              "de ‘i’ te tikken op het toetsenbord."
     },

    {"text0": "Nu gaan we plaatjes combineren.",

     "text1": "Wanneer je een plaatje ziet van een {} of {} verplaats je deze naar links door op de ‘e’ "
              "te tikken op het toetsenbord. Dat zijn dus deze plaatjes.",

     "text2": "Wanneer je een plaatje ziet van een {} of {} verplaats je deze naar rechts door op de "
              "‘i’ te tikken op het toetsenbord. Dat zijn dus deze plaatjes."
     },

    {"text0": "Goed gedaan! We gaan het nog een keer doen, maar draaien nu links en rechts om.",

     "text1": "Hieronder zie je plaatjes van een {}. Deze ga je zo naar links verplaatsen. Dit doe je door op de "
              "‘e’ te tikken op het toetsenbord.",

     "text2": "Ook ga je plaatjes zien van een {}. Deze ga je zo naar rechts verplaatsen. Dit doe je door op de "
              "‘i’ te tikken op het toetsenbord."
     },

    {"text0": "Nog een set met plaatjes te gaan! Je doet het heel goed.",

     "text1": "Wanneer je een plaatje ziet van een {} of {} verplaats je deze naar links door op de ‘e’ "
              "te tikken op het toetsenbord. Dat zijn dus deze plaatjes.",

     "text2": "Wanneer je een plaatje ziet van een {} of {} verplaats je deze naar rechts door op de "
              "‘i’ te tikken op het toetsenbord. Dat zijn dus deze plaatjes."
     },
]

block_end_text = "Zet je linker wijsvinger op de ‘e’, en je rechter wijsvinger op de ‘i’, zo kun je " \
                 "snel plaatjes verplaatsen! Ben je er klaar voor? Druk dan op volgende."

final_block_text = {

    "text": "Super goed gedaan! We willen je graag ook wat vragen stellen. "
            "Er zijn geen goede of foute antwoorden op deze vragen! Als je het helemaal eens bent met een zin, "
            "klik je op het bolletje helemaal rechts. Als je het er helemaal niet mee eens bent, klik je op het "
            "bolletje helemaal links. Je mag er ook iets tussenin kiezen!"
}

collection_quiz_beginning_text = "Leuk dat je mee doet aan dit onderzoek! Als je iets niet begrijpt tijdens het onderzoek, " \
                      "of als je wilt " \
                      "stoppen, steek dan je hand op. We komen dan zo snel mogelijk naar je toe om je te helpen."

collection_quiz_end_text = "Bedankt voor het meedoen aan dit onderzoek! We willen je vragen om niet te verklappen" \
                "wat je precies gedaan hebt aan andere kinderen die misschien nog mee willen doen.\n" \
                "Steek je hand op, dan komt er zo snel mogelijk iemand naar je toe."

intervention_video_text = "Wat goed gedaan! Je hebt alle vragen gehad. " \
                          "Je mag nog een korte video kijken waarin we je vertellen wat een programmeur eigenlijk is."

control_video_text = "Allereerst ga je naar een video kijken waarin we je uitleg geven over het beroep ‘programmeur’."

dummy_iat_dissemination = [
    {
        "is_active": True,
        "text": "",
        "information": None,
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
    {
        "is_active": True,
        "text": "Programmeurs zijn sociaal. Als je sociaal bent maak je makkelijk vrienden en werk je graag samen",
        "information": None,
        "q_type": "likert",
        "id": 5,
        "choices": [

        ]
    },
    {
        "text": "Wat nationality is your mother?.",
        "q_type": "mc_multiple_answer",
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
    {
        "is_active": True,
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
                "text": "Anders"
            }
        ]
    },
    {
        "q_type": "finish",
        "title": "Einde",
        "text": "Bedankt voor het meedoen aan dit onderzoek! We willen je vragen om niet te verklappenwat je precies gedaan hebt aan andere kinderen die misschien nog mee willen doen.\nSteek je hand op, dan komt er zo snel mogelijk iemand naar je toe."
    }
]

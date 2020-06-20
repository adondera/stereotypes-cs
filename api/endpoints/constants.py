# pylint: disable=line-too-long
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

COLUMNS_RESULTS = ["Participant Name", "Question ID", "Question Type", "Question Text",
                   "Participant Answers", "Image", "Response Time", "Before Video"]

BLOCK_START_TEXT = [

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

BLOCK_END_TEXT = "Zet je linker wijsvinger op de ‘e’, en je rechter wijsvinger op de ‘i’, zo kun je " \
                 "snel plaatjes verplaatsen! Ben je er klaar voor? Druk dan op volgende."

FINAL_BLOCK_TEXT = {

    "text": "Super goed gedaan! We willen je graag ook wat vragen stellen. "
            "Er zijn geen goede of foute antwoorden op deze vragen! Als je het helemaal eens bent met een zin, "
            "klik je op het bolletje helemaal rechts. Als je het er helemaal niet mee eens bent, klik je op het "
            "bolletje helemaal links. Je mag er ook iets tussenin kiezen!"
}

COLLECTION_QUIZ_BEGINNING_TEXT = "Leuk dat je mee doet aan dit onderzoek! Als je iets niet begrijpt tijdens het onderzoek, " \
                      "of als je wilt " \
                      "stoppen, steek dan je hand op. We komen dan zo snel mogelijk naar je toe om je te helpen."

COLLECTION_QUIZ_END_TEXT = "Bedankt voor het meedoen aan dit onderzoek! We willen je vragen om niet te verklappen" \
                "wat je precies gedaan hebt aan andere kinderen die misschien nog mee willen doen.\n" \
                "Steek je hand op, dan komt er zo snel mogelijk iemand naar je toe."

INTERVENTION_VIDEO_TEXT = "Wat goed gedaan! Je hebt alle vragen gehad. " \
                          "Je mag nog een korte video kijken waarin we je vertellen wat een programmeur eigenlijk is."

CONTROL_VIDEO_TEXT = "Allereerst ga je naar een video kijken waarin we je uitleg geven over het beroep ‘programmeur’."

DISSEMINATION_RESULT_MALE = "Volgens deze test associeert u programmeren met mannen."

DISSEMINATION_RESULT_FEMALE = "Volgens deze test associeert u programmeren met vrouwen."

DISSEMINATION_NO_ASSOCIATION = "Volgens deze test heeft u geen associatie tussen programmeren met gender."

DISSEMINATION_QUIZ_END_TEXT = "Bedankt voor het afleggen van de test. Druk op de knop om uw resultaten te zien."

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
    
    {   "text0": "Je gaat zo verschillende plaatjes zien die je naar links of naar rechts moet verplaatsen. Doe dit zo "
                 "snel mogelijk en probeer zo min mogelijk fouten te maken. Mocht je toch een foutje maken, geen "
                 "probleem! Je mag het dan nog een keer proberen.",

        "text1": "Hieronder zie je plaatjes van {}. Deze ga je zo naar links verplaatsen. Dit doe je door op "
                 "de ‘e’ te tikken op het toetsenbord.",
                    
        "text2": "Ook ga je plaatjes zien van {}. Deze ga je zo naar rechts verplaatsen. Dit doe je door op "
                 "de ‘i’ te tikken op het toetsenbord."
    },

    {   "text0": "Goed gedaan! We gaan het nog een keer doen, maar nu met nieuwe plaatjes.",
    
        "text1": "Hieronder zie je plaatjes van {}. Deze ga je zo naar links verplaatsen. Dit doe je door op "
                 "de ‘e’ te tikken op het toetsenbord.",
                    
        "text2": "Ook ga je plaatjes zien van {}. Deze ga je zo naar rechts verplaatsen. Dit doe je door op "
                 "de ‘i’ te tikken op het toetsenbord."
    },
    
    {   "text0": "Nu gaan we plaatjes combineren.",
    
        "text1": "Wanneer je een plaatje ziet van {} of {} verplaats je deze naar links door op de ‘e’ "
                 "te tikken op het toetsenbord. Dat zijn dus deze plaatjes.",
                    
        "text2": "Wanneer je een plaatje ziet van {} en {} verplaats je deze naar rechts door op de "
                 "‘i’ te tikken op het toetsenbord. Dat zijn dus deze plaatjes."
    },
    
    {   "text0": "Goed gedaan! We gaan het nog een keer doen, maar draaien nu links en rechts om.",
    
        "text1": "Hieronder zie je plaatjes van {}. Deze ga je zo naar links verplaatsen. Dit doe je door op de "
                 "‘e’ te tikken op het toetsenbord.",
                    
        "text2": "Ook ga je plaatjes zien van {}. Deze ga je zo naar rechts verplaatsen. Dit doe je door op de "
                 "‘i’ te tikken op het toetsenbord."
    },

    {   "text0": "Nog een set met plaatjes te gaan! Je doet het heel goed.",
    
        "text1": "Wanneer je een plaatje ziet van {} of {} verplaats je deze naar links door op de ‘e’ "
                 "te tikken op het toetsenbord. Dat zijn dus deze plaatjes.",
                    
        "text2": "Wanneer je een plaatje ziet van {} en {} verplaats je deze naar rechts door op de "
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




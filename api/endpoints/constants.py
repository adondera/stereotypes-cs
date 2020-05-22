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


resp = {"questions": [
    {
        "type": 4,
        "title": "Information",
        "header": "Gender profession IAT",
        "body":
            "In the following minutes you will see several images with two words each. One on the right, and the other on the left. Please choose the word you consider aproppriate: Left word (key E), Right word (key I). Please click on Next when ready",
    },
    {
        "type": 1,
        "title": "Binary question",
        "textLeft": "Programmer",
        "textRight": "Writer",
        "image": "https://i.imgur.com/9GIFW9f.jpg",
    },
    {
        "type": 1,
        "title": "Binary question",
        "textLeft": "Male",
        "textRight": "Female",
        "image":
            "https://i.imgur.com/9GIFW9f.jpg",
    },
    {
        "type": 1,
        "title": "Binary question",
        "textLeft": "Programmer & Male",
        "textRight": "Writer & Female",
        "image":
            "https://i.imgur.com/9GIFW9f.jpg",
    },
    {
        "type": 4,
        "title": "Information",
        "header": "Explicit IAT",
        "body":
            "In the following minutes you will be shown several statements. Please indicate how much you agree with the statement",
    },
    {
        "type": 2,
        "title": "Likert Scale",
        "text": "Programming is a profession for men",
        "image": "https://i.imgur.com/9GIFW9f.jpg",
    },
    {
        "type": 2,
        "title": "Likert Scale 2",
        "text": "Writer is a profession for men",
        "image": "https://i.imgur.com/9GIFW9f.jpg",
    },
    {
        "type": 2,
        "title": "Likert Scale 2",
        "text": "Programmers like to work alone",
        "image": "https://i.imgur.com/9GIFW9f.jpg",
    },
    {
        "type": 3,
        "title": "Video",
        "text":
            "You are going to watch a video about stereotypes in Computer Science. Click play when ready.",
        "videoId": "7CVtTOpgSyY",
    },
    {
        "type": 4,
        "title": "Thank you for watching the movie!",
        "header": "In the following minutes you will see questions",
        "body": ""
    },
    {
        "type": 6,
        "title": "Multiple Choice",
        "text": "What is your age",
        "options": ["6", "7", "8", "9", "10"],
    },
    {
        "type": 6,
        "title": "Multiple choice",
        "text": "Gender identity",
        "options": ["Male", "Female", "Other"],
    },
    {
        "type": 5,
        "title": "Ending",
        "text": "Thank you for participating. Morbi elementum libero sem, vel rhoncus justo porta a. Proin ultricies sem urna, in iaculis massa pharetra a. Praesent suscipit arcu neque, et sollicitudin lacus interdum vel. Ut sagittis est non turpis ullamcorper, id laoreet dui scelerisque. Fusce mattis odio augue, vel iaculis odio porta et. Phasellus ullamcorper pellentesque magna, non placerat purus"
    },
]}


consent_data = {
   "isSigned": True,
   "hasValidFields": 1,
   "isSubmittable": True,
   "isAgreed": True,
   "signature": "data:image/png;base64,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",
   "children": [
      {
         "firstName": "1",
         "lastName": "Child last name",
         "isValid": True
      },
      {
         "firstName": "2",
         "lastName": "Child last name",
         "isValid": True
      },
      {
         "firstName": "3",
         "lastName": "Child last name",
         "isValid": True
      }
   ],
   "parent": {
      "firstName": "Parent first name",
      "lastName": "Parent last name",
      "isValid": True
   }
}
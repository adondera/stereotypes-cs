const initialStore = {
  quizReducer: {
    answers: []
  },
  appReducer: {
    quizIndex: 0,
    quizData: [
      {
        id: 69,
        type: 1,
        title: 'Binary question',
        textLeft: 'Programmer',
        textRight: 'Writer',
        image: 'https://i.imgur.com/9GIFW9f.jpg',
        correctAnswer: 'right',
      },
      {
        id: 42,
        type: 1,
        title: 'Binary question ',
        textLeft: 'Pula',
        textRight: 'Pizda',
        image: 'https://i.imgur.com/9GIFW9f.jpg',
        correctAnswer: 'left',
      },
      {
        type: 4,
        title: 'Information',
        header: 'Gender profession IAT',
        body:
          'In the following minutes you will see several images with two words each. One on the right, and the other on the left. Please choose the word you consider aproppriate: Left word (key E), Right word (key I). Please click on Next when ready',
      },
      {
        id: 96,
        type: 2,
        title: 'Likert Scale',
        text: 'Programming is a profession for men',
        image: 'https://i.imgur.com/9GIFW9f.jpg',
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
      {
        id: 420,
        "type": 6,
        "title": "Multiple Choice",
        "text": "What is your age",
        "options": [
            "6",
            "7",
            "8",
            "9",
            "10"
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

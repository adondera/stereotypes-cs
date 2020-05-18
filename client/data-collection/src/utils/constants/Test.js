export const questions = [
    {
        // general information
        type: 4,
        title: "Information",
        header: "Gender profession IAT",
        body:
          "In the following minutes you will see several images with two words each. One on the right, and the other on the left. Please choose the word you consider aproppriate: Left word (key E), Right word (key I). Please click on Next when ready",
      },
      {
        // one image and two choises
        type: 1,
        title: "Binary question",
        textLeft: "Programmer",
        textRight: "Writer",
        image: "https://i.imgur.com/9GIFW9f.jpg",
      },
      {
        // one image and two choises
        type: 1,
        title: "Binary question",
        textLeft: "Male",
        textRight: "Female",
        image:
        "https://i.imgur.com/9GIFW9f.jpg",
      },
      {
        // one image and two choises
        type: 1,
        title: "Binary question",
        textLeft: "Programmer & Male",
        textRight: "Writer & Female",
        image:
        "https://i.imgur.com/9GIFW9f.jpg",
      },
      {
        // general information
        type: 4,
        title: "Information",
        header: "Explicit IAT",
        body:
          "In the following minutes you will be shown several statements. Please indicate how much you agree with the statement",
      },
      {
        // likert scale quetion (answers 1-5)
        type: 2,
        title: "Likert Scale",
        text: "Programming is a profession for men",
        image: "https://i.imgur.com/9GIFW9f.jpg",
      },
      {
        // same as above
        type: 2,
        title: "Likert Scale 2",
        text: "Writer is a profession for men",
        image: "https://i.imgur.com/9GIFW9f.jpg",
      },
      {
        // same as above
        type: 2,
        title: "Likert Scale 2",
        text: "Programmers like to work alone",
        image: "https://i.imgur.com/9GIFW9f.jpg",
      },
      {
        // just the video that we are going to play
        type: 3,
        title: "Video",
        text:
          "You are going to watch a video about stereotypes in Computer Science. Click play when ready.",
        videoId: "7CVtTOpgSyY",
      },
      {
        // information (same as above)
        type: 4,
        title: "Thank you for watching the movie!",
        header: "In the following minutes you will see questions",
        body: ""
      },
      {
        // multiple choise question (1 - length(options))
        type: 6,
        title: "Multiple Choice",
        text: "What is your age",
        options: ["6", "7", "8", "9", "10"],
      },
      {
        type: 6,
        title: "Multiple choice",
        text: "Gender identity",
        options: ["Male", "Female", "Other"],
      },
      {
        //final one -- just the information
        type: 5,
        title: "Ending",
      },
]
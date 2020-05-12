const mainAppReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_QUESTION":
      return {
        ...state,
        questionIndex: action.questionIndex,
      };
    case "DATA_IS_LOADED":
      console.log(action.questions);
      action.questions = {
        questions: [
          {
            type: 4,
            title: "THE QUIZ STARTS NOW!",
          },
          {
            type: 1,
            title: "Which one is the nice girl?",
            text: "Only one of them is a nice girl...",
            image1:
              "https://image.shutterstock.com/image-photo/cute-little-indianasian-girl-holding-260nw-1138447115.jpg",
            image2:
              "https://4.imimg.com/data4/UW/NP/MY-2403504/img_0166-250x250.jpg",
          },
          {
            type: 2,
            title: "Question 2",
            text: "How much do you like pizza?",
            image:
              "https://app.jerryspizza.ro/admin/uploads/website_products/pizza_Rustic.png",
          },
          {
            type: 3,
            title: "Watch the following video",
            videoId: "7CVtTOpgSyY",
          },
          {
            type: 5,
            title: "THE QUIZ HAS ENDED!",
          },
        ],
      };
      return {
        ...state,
        questions: action.questions,
        isDataLoaded: true,
      };
    case "FINISH_QUIZ":
      return {
        ...state,
        questionIndex: 0,
      };
    default:
      return state;
  }
};

export default mainAppReducer;

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
            title: "We will first get to know each other!",
            text:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin at magna lobortis lobortis. In et odio velit. Cras tincidunt, lacus vitae scelerisque maximus, ex risus placerat magna, ut pellentesque turpis risus in ante. Vestibulum vulputate eu lacus vel euismod. Etiam id nisi eleifend risus hendrerit sagittis. In hac habitasse platea dictumst. Mauris ut dolor non nibh varius vulputate",
          },
          {
            type: 1,
            title: "Binary question",
            text: "Which one is a keyboard",
            image1: "https://i.imgur.com/9GIFW9f.jpg",
            image2: "https://i.imgur.com/9GIFW9f.jpg",
          },
          {
            type: 1,
            title: "Binary question",
            text: "Which one is Donald duck",
            image1:
              "https://s12emagst.akamaized.net/products/2427/2426628/images/res_ec174d50b8395d32dfa933a7fa538e5d_full.jpg",
            image2:
              "https://www.ixxiyourworld.com/media/1676571/Mickey-Mouse-2.jpg?mode=crop&width=562&height=613",
          },
          {
            type: 2,
            title: "Question Likert Scale",
            text: "How much do you like pizza?",
            image: "https://i.imgur.com/9GIFW9f.jpg",
          },
          {
            type: 3,
            title: "Role models video",
            text:
              "You are going to watch a video about stereotypes in Computer Science. Click play when ready",
            videoId: "7CVtTOpgSyY",
          },
          {
            type: 6,
            title: "Multiple Choice",
            options: ["Option 1", "Option 2"],
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

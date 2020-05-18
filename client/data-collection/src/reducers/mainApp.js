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
            title: "Information",
            header: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            body:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin at magna lobortis lobortis. In et odio velit. Cras tincidunt, lacus vitae scelerisque maximus, ex risus placerat magna, ut pellentesque turpis risus in ante. Vestibulum vulputate eu lacus vel euismod. Etiam id nisi eleifend risus hendrerit sagittis. In hac habitasse platea dictumst. Mauris ut dolor non nibh varius vulputate",
          },
          {
            type: 1,
            title: "Binary question",
            textLeft: "Programmer",
            textRight: "writer",
            image: "https://i.imgur.com/9GIFW9f.jpg",
          },
          {
            type: 1,
            title: "Binary question",
            textLeft: "Donald",
            textRight: "Mickey",
            image:
              "https://s12emagst.akamaized.net/products/2427/2426628/images/res_ec174d50b8395d32dfa933a7fa538e5d_full.jpg",
          },
          {
            type: 2,
            title: "Likert Scale",
            text: "Cats are better than dogs",
            image: "https://i.imgur.com/9GIFW9f.jpg",
          },
          {
            type: 2,
            title: "Likert Scale 2",
            text: "Dogs are better than cats",
            image: "https://i.imgur.com/9GIFW9f.jpg",
          },
          {
            type: 3,
            title: "Video",
            text:
              "You are going to watch a video about stereotypes in Computer Science. Click play when ready.",
            videoId: "7CVtTOpgSyY",
          },
          {
            type: 4,
            title: "Thank you for watching the movie!",
            header: "We will now do some multiple choise questions",
            body: ""
          },
          {
            type: 6,
            title: "Multiple Choice",
            text: "What do you preffer",
            options: ["Pasta", "Pizza", "Burger"],
          },
          {
            type: 6,
            title: "Choose your favourite color",
            text: "What do you preffer",
            options: ["Red", "Green", "Pink"],
          },
          {
            type: 5,
            title: "Ending",
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

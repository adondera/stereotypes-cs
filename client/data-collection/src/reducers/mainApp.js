const mainAppReducer = (
  state = {
    activeChild: { firstName: "", lastName: "", id: "" },
    hasActiveChild: false,
  },
  action
) => {
  switch (action.type) {
    /*
    Change active question
    */
    case "CHANGE_QUESTION":
      return {
        ...state,
        questionIndex: action.questionIndex,
      };

    /*
    Conform data is loaded successfully
    */
    case "DATA_IS_LOADED":
      console.log(action.questions);
      action.questions = {
        questions: action.questions,
      };
      return {
        ...state,
        questions: action.questions,
        isDataLoaded: true,
      };

    /*
    Finish the quiz by making start screen active
    */
    case "FINISH_QUIZ":
      return {
        ...state,
        questionIndex: 0,
      };

    /*
  Rregister new child
  */
    case "REGISTER_CHILD":
      return {
        ...state,
        activeChild: action.child,
        hasActiveChild: true,
      };

    case "REMOVE_ACTIVE_CHILD":
      return {
        ...state,
        activeChild: {
          firstName: "",
          lastName: "",
          id: "",
        },
        hasActiveChild: false,
      };

    default:
      return state;
  }
};

export default mainAppReducer;

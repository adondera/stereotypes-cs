const mainAppReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_QUESTION":
      return {
        ...state,
        questionIndex: action.questionIndex,
      };
    case "GET_DATA":
      return {
        ...state,
        questions: action.questions,
      };
    default:
      return state;
  }
};

export default mainAppReducer;

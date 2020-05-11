const mainAppReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_QUESTION":
      return {
        ...state,
        questionIndex: action.questionIndex,
      };
    case "DATA_IS_LOADED":
      return {
        ...state,
        isDataLoaded: true,
      };
    default:
      return state;
  }
};

export default mainAppReducer;

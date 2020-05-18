import {questions} from "../utils/constants/Test"
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
        questions: questions
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

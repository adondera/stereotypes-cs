import {sendData} from "../utils/requests/postRequsts"
const questionsReducer = (state = { answers: [] }, action) => {
  switch (action.type) {

    /*
    Save question answer in store
    */
    case "SAVE_QUESTION_ANSWER":
      const newAnswer = {
        ...action.data,
        questionType: action.questionType,
      };
      const newAnswers = [...state.answers, newAnswer];
      return {
        ...state,
        answers: newAnswers,
      };

    /*
    Clear question results from store
    */
    case "CLEAR_QUESTIONS":
      return { ...state, answers: [] };

    /*
    Send question results to server
    */
    case "SEND_QUESTIONS_ANSWERS":
      sendData(state.answers, action.childId)
      return { ...state, answers: [] };
      
    default:
      return state;
  }
};

export default questionsReducer;

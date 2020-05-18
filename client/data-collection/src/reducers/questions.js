const questionsReducer = (state = { answers: [] }, action) => {
  switch (action.type) {
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
    case "CLEAR_QUESTIONS":
      return { ...state, answers: [] };
    case "SEND_QUESTIONS_ANSWERS":
      console.log(state.answers);
      return null;
    default:
      return state;
  }
};

export default questionsReducer;

const questionsReducer = (state = { answers: [] }, action) => {
  switch (action.type) {
    case "SAVE_QUESTION_ANSWER":
      const newAnswer = {
        answer: action.answer,
        questionType: action.questionType,
      };
      const newAnswers = [...state.answers, newAnswer];
      return {
        ...state,
        answers: newAnswers,
      };
    case "CLEAR_QUESTIONS":
      return { ...state, answers: [] };
    default:
      return state;
  }
};

export default questionsReducer;

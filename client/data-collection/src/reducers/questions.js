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
    default:
      return state;
  }
};

export default questionsReducer;

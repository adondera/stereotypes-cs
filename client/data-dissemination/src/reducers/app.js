const appReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INCREMENT_QUIZ_INDEX':
      const newIndex = state.quizIndex + 1;
      return {
        ...state,
        quizIndex: newIndex,
      };
    case 'FINISH_QUIZ':
      return {
        ...state,
        quizIndex: 0,
        quizIsFinished: true,
      };
    default:
      return state;
  }
};

export default appReducer;

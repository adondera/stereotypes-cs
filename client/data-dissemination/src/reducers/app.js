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
        result: action.result
      };
    case 'ANSWERS_SEND_FAILED':
      return {
        ...state,
        quizIndex: 0,
        quizIsFinished: false,   // ???
      } 
    case 'QUIZ_LOADED':
        return {
            ...state,
            quizData: action.quizData
        }
    default:
      return state;
  }
};

export default appReducer;

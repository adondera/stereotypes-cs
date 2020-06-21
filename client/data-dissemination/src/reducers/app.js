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
        quizResultLoading: true,
        quizIsFinished: true,
      };
    case 'FETCH_RESULT_FAILED':
      return {
        ...state,
        quizIsFinished: false,
        quizResultLoading: false,
      } 
    case 'FETCH_RESULT_SUCCESS':
      return {
        ...state,
        quizResultLoading: false,
        quizResultAvailable: true,
        result: action.result
      }
    case 'QUIZ_LOADED':
        return {
            ...state,
            quizData: action.quizData,
            quizIsLoaded: true
        }
    default:
      return state;
  }
};

export default appReducer;

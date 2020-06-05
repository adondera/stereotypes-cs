const mainAppReducer = (
  state = {
    activeChild: { firstName: '', lastName: '', id: '' },
    hasActiveChild: false,
    loadFailed: false
  },
  action
) => {
  switch (action.type) {

    case 'DATA_IS_LOADING':
      return {
        ...state,
        loadFailed: false
      }
    /*
    Change active question
    */
    case 'CHANGE_QUESTION':
      return {
        ...state,
       questionIndex: action.questionIndex,
       //questionIndex: 37
      };

    /*
    Conform data is loaded successfully
    */
    case 'DATA_IS_LOADED':
      action.questions = {
        questions: action.questions,
      };
      return {
        ...state,
        questions: action.questions,
        isDataLoaded: true,
      };
    
    /*
    Data load failed
    */
   case 'DATA_LOAD_FAILED':
     return {
       ...state,
       loadFailed: true
     }

    case 'SEND_SUCCESS': 
     return { ...state, sendDataStatus: 1}
    
    case 'SEND_FAIL':
      return { ...state, sendDataStatus: 2}

    /*
    Finish the quiz by making start screen active
    */
    case 'FINISH_QUIZ':
      return {
        ...state,
        questionIndex: 0,
        sendDataStatus: 0
      };

    /*
  Rregister new child
  */
    case 'REGISTER_CHILD':
      return {
        ...state,
        activeChild: action.child,
        hasActiveChild: true,
      };

    case 'REMOVE_ACTIVE_CHILD':
      return {
        ...state,
        activeChild: {
          firstName: '',
          lastName: '',
          id: '',
        },
        hasActiveChild: false,
      };

    default:
      return state;
  }
};

export default mainAppReducer;

const mainAppReducer = (
  state = {
    shouldRemoveChild: false,
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
        loadFailed: false,
        isDataLoaded: false
      }
    /*
    Change active question
    */
    case 'CHANGE_QUESTION':
      return {
        ...state,
      questionIndex: action.questionIndex,
      };


    /*
    Skip to first finish type found in array of questions (for terminating quiz early)
    */
    case 'SKIP_TO_FINISH':
      var finishIndex = state.questionIndex
      for (var i=0; i<state.questions.questions.length; i++) {
        if(state.questions.questions[i].q_type === "finish") {
          finishIndex = i+1
          break
        }
      }
      console.log(finishIndex)
      return {
        ...state,
        questionIndex: finishIndex
      }

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
        sendDataStatus: 0,
        shouldRemoveChild: true
      };

    /*
  Rregister new child
  */
    case 'REGISTER_CHILD':
      return {
        ...state,
        activeChild: action.child,
        hasActiveChild: true,
        shouldRemoveChild: false
      };

    case 'REMOVE_ACTIVE_CHILD':
      if(!state.shouldRemoveChild) {
        return {
          ...state
        }
      }
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

import { sendData } from '../utils/requests/postRequsts';
const questionsReducer = (
  state = { answers: [], before_video: true, participant_id: undefined },
  action
) => {
  switch (action.type) {
    /*
    Save question answer in store
    */
    case 'SAVE_QUESTION_ANSWER':
      const newAnswer = {
        ...action.data,
        before_video: state.before_video,
        participant_id: state.participant_id,
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
    case 'CLEAR_QUESTIONS':
      return { ...state, answers: [] };

    /*
    Send question results to server
    */
    case 'SEND_QUESTIONS_ANSWERS':
      sendData(state.answers, action.childInfo);
      return { ...state, answers: [] };

    case 'VIDEO_WAS_PLAYED':
      return {
        ...state,
        before_video: false,
      };

    case 'REGISTER_CHILD':
      return {
        ...state,
        participant_id: action.child.id,
      };
    default:
      return state;
  }
};

export default questionsReducer;

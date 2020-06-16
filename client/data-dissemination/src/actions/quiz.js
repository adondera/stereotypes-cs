import { sendData } from "../utils/requests/postRequests";

export const registerAnswer = (answer) => {
    return {
        type: 'REGISTER_ANSWER',
        answer: {...answer}
    }
}

export const sendQuiz = () => {
    return async (dispatch, getState) => {
    var answerData = {}
    console.log(getState())
    answerData.data = [...getState().quizReducer.answers]
    return sendData(answerData)
                        .then((response) => response.ok ? dispatch({type: 'FETCH_RESULTS_SUCCESS', result: response.data}) : dispatch({type: 'FETCH_RESULTS_FAILED'}))
                        .catch(() => dispatch({type: 'FETCH_RESULTS_FAILED'}))
    }
}
import { sendData } from "../utils/requests/postRequests";

export const registerAnswer = (answer) => {
    return {
        type: 'REGISTER_ANSWER',
        answer: {...answer}
    }
}

export const sendQuiz = (email) => {
    return async (dispatch, getState) => {
    var answerData = {}
    answerData.data = [...getState().quizReducer.answers]
    if (email !== false) answerData.email = email
    return sendData(answerData)
                        .then((response) => {response.statusText === 'OK' ? dispatch({type: 'FETCH_RESULT_SUCCESS', result: response.data}) : dispatch({type: 'FETCH_RESULT_FAILED'})})
                        .then(dispatch({type: 'FINISH_QUIZ'}))
                        .catch(() => dispatch({type: 'FETCH_RESULT_FAILED'}))
    }
}
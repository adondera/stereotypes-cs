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
        console.log(answerData);
    return sendData(answerData)
                        .then((response) => {response.statusText === 'OK' ? dispatch({type: 'FETCH_RESULT_SUCCESS', result: response.data}) : dispatch({type: 'FETCH_RESULT_FAILED'})})
                        .catch(() => dispatch({type: 'FETCH_RESULT_FAILED'}))
    }
}
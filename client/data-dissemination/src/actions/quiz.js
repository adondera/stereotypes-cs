import { sendData } from "../utils/requests/postRequests";

export const registerAnswer = (answer) => {
    return {
        type: 'REGISTER_ANSWER',
        answer: {...answer}
    }
}

export const sendQuiz = () => {
    return (dispatch, getState) => {
    var answerData = {}
    console.log(getState())
    answerData.data = [...getState().quizReducer.answers]
    sendData(answerData).then((response) => response.status === 200 ? dispatch({type: 'FINISH_QUIZ', result: response.data}) : dispatch({type: 'ANSWERS_SEND_FAILED'}))
                        .catch((err) => dispatch({type: 'ANSWERS_SEND_FAILED'}))
    }
}
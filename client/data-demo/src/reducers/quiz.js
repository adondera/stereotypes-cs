const quizReducer = (state={answers: []}, action) => {
    switch (action.type) {
        case 'REGISTER_ANSWER':
            const newAnswers = [...state.answers, action.answer];
            return {
                ...state,
                answers: newAnswers
            }
        case 'ANSWERS_SEND_FAILED':
            return {
                ...state,
                answers: []
            }
        case 'FINISH_QUIZ':
            return {
                ...state,
                answers: []
            }
        default:
            return state;
    }
}


export default quizReducer;
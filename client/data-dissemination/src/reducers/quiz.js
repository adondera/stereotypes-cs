const quizReducer = (state={answers: []}, action) => {
    switch (action.type) {
        case 'REGISTER_ANSWER':
            const newAnswers = [...state.answers, action.answer];
            console.log(action.answer);
            return {
                ...state,
                answers: newAnswers
            }
        default:
            return state;
    }
}


export default quizReducer;
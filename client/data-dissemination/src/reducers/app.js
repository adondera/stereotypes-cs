const appReducer = (state = {quizIndex: 0, quizData: [{type: 1, correctAnswer: 'right'}, {type: 2}]}, action) => {
    switch (action.type) {
        case 'INCREMENT_QUIZ_INDEX':
            const newIndex = state.quizIndex + 1;
            return {
                ...state,
                quizIndex: newIndex
            }
        default:
            return state;
    }
}

export default appReducer;
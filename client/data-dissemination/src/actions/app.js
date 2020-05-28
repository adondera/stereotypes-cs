import { getQuiz } from '../utils/requests/getQuiz';

export const incrementQuizIndex = () => {
    return {
        type: 'INCREMENT_QUIZ_INDEX'
    }
}

export const finishQuiz = () => {
    return {
        type: 'FINISH_QUIZ'
    }
}

export const quizLoaded = (quizData) => {
    console.log(quizData)
    return {
        type: 'QUIZ_LOADED',
        quizData: [...quizData],
        quizIsLoaded: true

    }
}

export const quizLoadFailed = () => {
    return {
        type: 'QUIZ_LOAD_FAILED'
    }
}
export const loadQuiz = () => {
    return function(dispatch) {
        return getQuiz().then(res => dispatch(quizLoaded(res.data.questions))).catch(dispatch(quizLoadFailed()))
    }
}

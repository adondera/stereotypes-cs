import { getQuiz } from '../utils/requests/getQuiz';

export const incrementQuizIndex = () => {
    return {
        type: 'INCREMENT_QUIZ_INDEX'
    }
}

export const finishQuiz = () => {
    return {
        type: 'FINISH_QUIZ',
    }
}

export const quizLoaded = (quizData) => {
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
    return async function(dispatch) {
        return getQuiz().then(res => {dispatch(quizLoaded(res.data))}).catch((err) => dispatch(quizLoadFailed()))
    }
}

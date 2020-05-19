import { getQuiz } from "../utils/requests/getQuiz";

/*
  Get all the data from the server.
*/
export const getQuizData = (accessToken, dispatch) => {
  dispatch(dataIsLoading());
  getQuiz(accessToken, (res) => dispatch(dataLoaded(res)));
};

/*
  Change boolan field as soon as all data has arrived.
*/
export const dataLoaded = (res) => {
  console.log(res)
  return {
    type: "DATA_IS_LOADED",
    questions: res.data.questions,
  };
};

/*
  Inform store that data is currently being fetched
*/
export const dataIsLoading = () => {
  return {
    type: "DATA_IS_LOADING"
  }
}

/*
  Change active quiz question
*/
export const changeQuestion = (questionIndex, questionsLength) => {
  return {
    type: "CHANGE_QUESTION",
    questionIndex: questionIndex + 1,
  };
};

export const finishQuiz = () => {
    return {
        type: "FINISH_QUIZ"
    }
}

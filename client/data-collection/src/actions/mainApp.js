import { getQuiz } from "../utils/requests/getQuiz";

/*
  Get all the data from the server.
*/
export const getQuizData = (accessToken, dispatch) => {
  getQuiz(accessToken, () => dispatch(dataLoaded()));
};

/*
  Change boolan field as soon as all data has arrived.
*/
export const dataLoaded = () => {
  return {
    type: "DATA_IS_LOADED",
  };
};

/*
    Change active quiz question
*/
export const changeQuestion = (questionIndex) => {
  return {
    type: "CHANGE_QUESTION",
    questionIndex: questionIndex + 1,
  };
};

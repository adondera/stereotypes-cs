import { getQuiz } from "../utils/requests/getQuiz";
import { getChild } from "../utils/sockets/queue";
import { preload } from "../utils/preloaders/images";
/*
  Get all the data from the server.
*/
export const getQuizData = (accessToken, dispatch, version) => {
  dispatch(dataIsLoading());
  getQuiz(
    accessToken,
    (res) => dispatch(dataLoaded(res)),
    () => dispatch(dataLoadFailed()),
    version
  );
};

/*
  Store the version of the current test.
  
    "A": "control-social-female",
    "B": "control-social-male",
    "C": "control-hobby-female",
    "D": "control-hobby-male",
    "E": "intervention-social-female",
    "F": "intervention-social-male",
    "G": "intervention-hobby-female",
    "H": "intervention-hobby-male"
*/
export const setVersion = (version) => {
  return {
    type: "SET_VERSION",
    version: version,
  };
};
/*
  Change boolan field as soon as all data has arrived.
*/
export const dataLoaded = (res) => {
  preload(res.data);
  return {
    type: "DATA_IS_LOADED",
    questions: res.data,
  };
};

/*
  Fault tolerance for data load fail
*/
export const dataLoadFailed = () => {
  return {
    type: "DATA_LOAD_FAILED",
  };
};

/*
  Inform store that data is currently being fetched
*/
export const dataIsLoading = () => {
  return {
    type: "DATA_IS_LOADING",
  };
};

/*
  Change active quiz question
*/
export const changeQuestion = (questionIndex, questionsLength) => {
  return {
    type: "CHANGE_QUESTION",
    questionIndex: questionIndex + 1,
  };
};

/*
  Skips to finish
*/
export const skipQuiz = () => {
  return {
    type: "SKIP_TO_FINISH",
  };
};

export const finishQuiz = () => {
  return {
    type: "FINISH_QUIZ",
  };
};

export const registerChild = (dispatch) => {
  getChild(dispatch);
  return {
    type: "LOADING_NEW_CHILD",
  };
};

export const removeActiveChild = () => {
  return {
    type: "REMOVE_ACTIVE_CHILD",
  };
};

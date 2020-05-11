import { login } from "../utils/requests/postRequsts";
import { getQuiz } from "../utils/requests/getQuiz";

export const changePassword = (event) => {
  return {
    type: "CHANGE_PASSWORD",
    password: event.target.value,
  };
};

export const changeUsername = (event) => {
  return {
    type: "CHANGE_USERNAME",
    username: event.target.value,
  };
};

export const onSubmit = (username, password, dispatch) => {
  var data = {
    username: username,
    password: password,
  };
  login(
    data,
    (res) => dispatch(onLoggedIn(res.data.access_token)),
    () => dispatch(onLoginFailed())
  );
  return {
    type: "ON_LOG_IN",
    isLoading: true,
  };
};

export const getQuizData = (accessToken, dispatch) => {
  getQuiz(accessToken, () => dispatch(dataLoaded()));
};

export const dataLoaded = () => {
  return {
    type: "DATA_IS_LOADED"
  }
}

export const onLoggedIn = (accessToken) => {
  return {
    type: "ON_LOGGED_IN",
    isLoggedIn: true,
    isLoading: false,
    accessToken: accessToken,
  };
};

export const onLoginFailed = () => {
  return {
    type: "LOG_IN_FAILED",
    errorMessage: "Log in failed",
  };
};

export const changeQuestion = (questionIndex) => {
  return {
    type: "CHANGE_QUESTION",
    questionIndex: questionIndex + 1,
  };
};

export const closeErrorBar = () => {
  return {
    type: "CLOSE_ERROR_BAR",
  };
};

export const LoginActions = {
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  CHANGE_USERNAME: "CHANGE_USERNAME",
  ON_SUBMIT: "ON_LOG_IN",
  ON_LOGGED_IN: "ON_LOGGED_IN",
};

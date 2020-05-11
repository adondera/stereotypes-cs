import { login } from "../utils/requests/postRequsts";

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
  const response = login();
  return {
    type: "ON_LOG_IN",
    isLoading: true,
  };
};

export const onLoggedIn = () => {
  return {
    type: "ON_LOGGED_IN",
    isLoggedIn: true,
  };
};

export const changeQuestion = (questionIndex) => {
  return {
    type: "CHANGE_QUESTION",
    questionIndex: questionIndex + 1,
  };
};

export const LoginActions = {
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  CHANGE_USERNAME: "CHANGE_USERNAME",
  ON_SUBMIT: "ON_LOG_IN",
  ON_LOGGED_IN: "ON_LOGGED_IN",
};

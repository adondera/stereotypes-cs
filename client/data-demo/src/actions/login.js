import { login } from "../utils/requests/postRequsts";

/*
  User's password is updated in the store.
*/
export const changePassword = (event) => {
  return {
    type: "CHANGE_PASSWORD",
    password: event.target.value,
  };
};

/*
  User name is updated in the store.
*/
export const changeUsername = (event) => {
  return {
    type: "CHANGE_USERNAME",
    username: event.target.value,
  };
};

/*
  Action of submitting the data to the server.
*/
export const onSubmit = (username, password, dispatch) => {
  var data = {
    username: username,
    password: password,
  };
  login(
    data,
    (res) => {
      dispatch(onLoggedIn(res.data.access_token))},
    () => dispatch(onLoginFailed())
  );
  return {
    type: "ON_LOG_IN",
    isLoading: true,
  };
};

export const closeErrorBar = () => {
  return {
    type: "CLOSE_ERROR_BAR",
  };
};

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
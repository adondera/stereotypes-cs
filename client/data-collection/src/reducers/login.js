import {withToken, startSocket} from "../utils/sockets/queue";

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_USERNAME":
      return {
        ...state,
        username: action.username,
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        password: action.password,
      };
    case "ON_LOG_IN":
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case "ON_LOGGED_IN":
      withToken(action.accessToken)
      startSocket()
      return {
        ...state,
        accessToken: action.accessToken,
        username: "",
        password: "",
        isLoading: false,
        isLoggedIn: true,
      };
    case "LOG_IN_FAILED":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        errorMessage: action.errorMessage,
      };
    case "CLOSE_ERROR_BAR":
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default loginReducer;

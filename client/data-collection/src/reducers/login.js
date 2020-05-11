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
      };
    case "ON_LOGGED_IN":
      return {
          ...state,
          isLoading: false,
          isLoggedIn: true
      }
    default:
      return state;
  }
};

export default loginReducer;

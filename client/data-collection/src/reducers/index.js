import { combineReducers } from "redux";
import loginReducer from "../reducers/login";
import mainAppReducer from "../reducers/mainApp";
import questionsReducer from "../reducers/questions";

export default combineReducers({
  loginReducer,
  mainAppReducer,
  questionsReducer,
});

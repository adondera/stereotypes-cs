import { combineReducers } from "redux";
import loginReducer from "../reducers/login";
import mainAppReducer from "../reducers/mainApp";

export default combineReducers({
  loginReducer,
  mainAppReducer,
});

import { combineReducers } from "redux";
import appReducer from "../reducers/app";
import quizReducer from '../reducers/quiz';
/*
 Combine all store reducers in one, to be provided to the whole app
*/
export default combineReducers({
  appReducer,
  quizReducer
});

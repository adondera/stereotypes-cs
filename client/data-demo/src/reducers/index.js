import { combineReducers } from 'redux';
import loginReducer from '../reducers/login';
import mainAppReducer from '../reducers/mainApp';
import questionsReducer from '../reducers/questions';
import participantsReducer from '../reducers/participants'


/*
 Combine all store reducers in one, to be provided to the whole app
*/
export default combineReducers({
  loginReducer,
  mainAppReducer,
  participantsReducer,
  questionsReducer,
});

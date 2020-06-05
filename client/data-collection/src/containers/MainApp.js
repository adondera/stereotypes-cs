import { connect } from "react-redux";
import MainApp from '../components/MainApp';
import {changeQuestion, getQuizData, finishQuiz, setVersion} from "../actions/mainApp"


const mapStateToProps = (state) => {
    return {
      loadFailed: state.mainAppReducer.loadFailed,
      hasActiveChild: state.mainAppReducer.hasActiveChild,
      accessToken: state.loginReducer.accessToken,
      questionIndex: state.mainAppReducer.questionIndex,
      questions: state.mainAppReducer.questions,
      isDataLoaded: state.mainAppReducer.isDataLoaded
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    setVersion: (version) => dispatch(setVersion(version)),
    onQuestionChange: (questionIndex) => dispatch(changeQuestion(questionIndex)),
    loadData: (accessToken, version) => getQuizData(accessToken, dispatch, version),
    finishQuiz: () => dispatch(finishQuiz())
  });

  export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
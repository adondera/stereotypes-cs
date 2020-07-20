import { connect } from "react-redux";
import MainApp from '../components/MainApp';
import {changeQuestion, getQuizData, finishQuiz, setVersion, skipQuiz} from "../actions/mainApp"


const mapStateToProps = (state) => {
    return {
      loadFailed: state.mainAppReducer.loadFailed,
      hasActiveChild: state.mainAppReducer.hasActiveChild,
      accessToken: state.loginReducer.accessToken,
      questionIndex: state.mainAppReducer.questionIndex,
      questions: state.mainAppReducer.questions,
      isDataLoaded: state.mainAppReducer.isDataLoaded,
      shouldRemoveChild: state.mainAppReducer.shouldRemoveChild,
      version: state.questionsReducer.version
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    setVersion: (version) => dispatch(setVersion(version)),
    onQuestionChange: (questionIndex) => dispatch(changeQuestion(questionIndex)),
    loadData: (accessToken, version) => getQuizData(accessToken, dispatch, version),
    finishQuiz: () => dispatch(finishQuiz()),
    skipQuiz: () => dispatch(skipQuiz())
  });

  export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
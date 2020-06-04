import { connect } from "react-redux";
import MainApp from '../components/MainApp';
import {changeQuestion, getQuizData, finishQuiz} from "../actions/mainApp"


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
    onQuestionChange: (questionIndex) => dispatch(changeQuestion(questionIndex)),
    loadData: (accessToken) => getQuizData(accessToken, dispatch),
    finishQuiz: () => dispatch(finishQuiz())
  });

  export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
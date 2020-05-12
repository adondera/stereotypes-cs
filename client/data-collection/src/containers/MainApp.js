import { connect } from "react-redux";
import MainApp from '../components/MainApp';
import {changeQuestion, getQuizData} from "../actions/mainApp"


const mapStateToProps = (state) => {
    return {
      accessToken: state.loginReducer.accessToken,
      questionIndex: state.mainAppReducer.questionIndex,
      questions: state.mainAppReducer.questions,
      isDataLoaded: state.mainAppReducer.isDataLoaded
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    onQuestionChange: (questionIndex) => dispatch(changeQuestion(questionIndex)),
    loadData: (accessToken) => getQuizData(accessToken, dispatch),
  });

  export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
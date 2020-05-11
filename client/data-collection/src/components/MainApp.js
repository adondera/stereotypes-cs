import React from "react";
import { Route, Redirect } from "react-router";
import { Switch } from "react-router";
import { connect } from "react-redux";
import { changeQuestion } from "../actions/index";
import Question from "./Question";
import { getQuizData } from "../actions/index";
import PropTypes from "prop-types";


const MainApp = ({ questionIndex = 0, onQuestionChange , loadData, isDataLoaded = false, accessToken = "" }) => {

  return (
    <div>
      <Switch>
        <Route path="/load">
          <button onClick={() => loadData(accessToken)}>LOAD DATA</button>
          {isDataLoaded ? (
            <Redirect to="/app"/>
          ) : (null) }
        </Route>
        <Route path="/app">
          <h1>LOGGED IN</h1>
          <h1>You can start the quiz!</h1>
          <p> pula mea: {questionIndex} </p>
          <button onClick={() => onQuestionChange(questionIndex).questions}>START</button>
          {questionIndex === 0 ? null : <Redirect to="/questions" />}
        </Route>
        <Route path="/questions">
          <Question
            onQuestionChange={onQuestionChange}
            quizStarted={questionIndex > 0}
            questionIndex={questionIndex}
          />
        </Route>
      </Switch>
    </div>
  );
};

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

MainApp.propTypes = {
  questions: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);

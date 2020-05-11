import React from "react";
import { Route, Redirect } from "react-router";
import { Switch } from "react-router";
import { connect } from "react-redux";
import { changeQuestion } from "../actions/index";
import Question from "./Question";
import { getQuizData } from "../actions/index";
import PropTypes from "prop-types";


const MainApp = ({ questionIndex = 0, onQuestionChange , loadData }) => {

  return (
    <div>
      <Switch>
        <Route path="/app">
          <h1>LOGGED IN</h1>
          <h1>You can start the quiz!</h1>
          <p> pula mea: {questionIndex} </p>
          <button onClick={() => console.log(loadData())}>LOAD DATA</button>
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
  const questionIndex = state.mainAppReducer.questionIndex;
  const questions = state.mainAppReducer.questions;
  return {
    questionIndex: questionIndex,
    questions: questions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onQuestionChange: (questionIndex) => dispatch(changeQuestion(questionIndex)),
  loadData: () => dispatch(getQuizData()),
});

MainApp.propTypes = {
  questions: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);

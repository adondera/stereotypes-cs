import React from "react";
import { Route, Redirect } from "react-router";
import { Switch } from "react-router";
import { connect } from "react-redux";
import { changeQuestion } from "../actions/index";
import Question from "./Question";

const MainApp = ({ questionIndex = 0, onQuestionChange }) => {
  return (
    <div>
      <Switch>
        <Route path="/app">
          <h1>LOGGED IN</h1>
          <h1>You can start the quiz!</h1>
          <p> pula mea: {questionIndex} </p>
          <button onClick={() => onQuestionChange(questionIndex)}>START</button>
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
  return {
    questionIndex: questionIndex,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onQuestionChange: (questionIndex) => dispatch(changeQuestion(questionIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);

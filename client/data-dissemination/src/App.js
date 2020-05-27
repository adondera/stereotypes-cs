import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router";
import Quiz from "./components/Quiz";
import Home from "./components/Home";
import "./App.css";
import { incrementQuizIndex } from "./actions/app";
import { connect } from "react-redux";

function App({ quizIndex, quizData, incrementQuizIndex, quizIsLoaded }) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/quiz">
        <Quiz
          quizIndex={quizIndex}
          quizData={quizData}
          quizIsLoaded={quizIsLoaded}
          incrementQuizIndex={incrementQuizIndex}
        />
      </Route>
      <Route exact path="/results">
        Results
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    quizIndex: state.appReducer.quizIndex,
    quizData: state.appReducer.quizData,
    quizIsLoaded: state.appReducer.quizIsLoaded

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQuizIndex: () => dispatch(incrementQuizIndex()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

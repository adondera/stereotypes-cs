import React from "react";
import { Route, Redirect } from "react-router";
import { Switch } from "react-router";
import Question from "../containers/Question";
import PropTypes from "prop-types";
import Start from "./Start";
import Load from "./Load";
import QueueManagement from "./QueueManagement";

const MainApp = ({
  setVersion,
  loadFailed = false,
  hasActiveChild = false,
  questionIndex = 0,
  onQuestionChange,
  loadData,
  isDataLoaded = false,
  accessToken = "",
  finishQuiz,
  skipQuiz
}) => {
  return (
    <div>
      <Switch>
        <Route path="/load">
          <Load loadFailed={loadFailed} accessToken={accessToken} onLoadData={(version) => {setVersion(version); loadData(accessToken, version)}} />
          {isDataLoaded ? <Redirect to="/app" /> : null}
        </Route>
        <Route path="/app">
          <QueueManagement questionIndex={questionIndex} />
          <Start canStart={hasActiveChild} onClick={() => onQuestionChange(questionIndex).questions} />
          {questionIndex === 0 ? null : <Redirect to="/questions" />}
        </Route>
        <Route path="/questions">
          <Question
            onQuizFinished={finishQuiz}
            onQuestionChange={onQuestionChange}
            quizStarted={questionIndex > 0}
            questionIndex={questionIndex}
            onSkipQuiz={skipQuiz}
          />
        </Route>
      </Switch>
    </div>
  );
};

MainApp.propTypes = {
  serVersion: PropTypes.func,
  loadFailed: PropTypes.bool,
  hasActiveChild: PropTypes.bool,
  questions: PropTypes.object,
  questionIndex: PropTypes.number,
  onQuestionChange: PropTypes.func,
  loadData: PropTypes.func,
  isDataLoaded: PropTypes.bool,
  accessToken: PropTypes.string,
  finishQuiz: PropTypes.func,
};

export default MainApp;

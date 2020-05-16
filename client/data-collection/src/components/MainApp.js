import React from "react";
import { Route, Redirect } from "react-router";
import { Switch } from "react-router";
import Question from "../containers/Question";
import PropTypes from "prop-types";
import Start from "./Start";
import Load from "./Load"

const MainApp = ({
  questionIndex = 0,
  onQuestionChange,
  loadData,
  isDataLoaded = false,
  accessToken = "",
  finishQuiz,
}) => {
  return (
    <div>
      <Switch>
        <Route path="/load">
          <Load onClick={() => loadData(accessToken)}/>
          {isDataLoaded ? <Redirect to="/app" /> : null}
        </Route>
        <Route path="/app">
          <Start onClick={() => onQuestionChange(questionIndex).questions} />
          {questionIndex === 0 ? null : <Redirect to="/questions" />}
        </Route>
        <Route
          path="/questions"
        >
          <Question
            onQuizFinished={finishQuiz}
            onQuestionChange={onQuestionChange}
            quizStarted={questionIndex > 0}
            questionIndex={questionIndex}
          />
        </Route>
      </Switch>
    </div>
  );
};

MainApp.propTypes = {
  questions: PropTypes.object,
};

export default MainApp;

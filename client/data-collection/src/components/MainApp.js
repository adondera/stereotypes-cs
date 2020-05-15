import React from "react";
import { Route, Redirect } from "react-router";
import { Switch } from "react-router";
import Question from "../containers/Question";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

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
            <button onClick={() => loadData(accessToken)}>LOAD DATA</button>
            {isDataLoaded ? <Redirect to="/app" /> : null}
          </Route>
          <Route path="/app">
            <h1>You can now start the quiz!</h1>
            <Button
                variant="contained"
                onClick={() => onQuestionChange(questionIndex).questions}
                color="secondary"
            >
              START!
            </Button>
            {questionIndex === 0 ? null : <Redirect to="/questions" />}
          </Route>
          <Route path="/questions">
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

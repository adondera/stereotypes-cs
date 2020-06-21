import React from "react";
import { Route, Redirect } from "react-router";
import { Switch } from "react-router";
import Question from "../containers/Question";
import PropTypes from "prop-types";
import Start from "./Start";
import Load from "./Load";
import QueueManagement from "./QueueManagement";
import Stats from './Stats'
import Participants from "../containers/Participants";
import BackIcon from '@material-ui/icons/Backspace'
import {Link} from 'react-router-dom'

const MainApp = ({
  shouldRemoveChild,
  setVersion,
  loadFailed = false,
  hasActiveChild = false,
  questionIndex = 0,
  onQuestionChange,
  loadData,
  isDataLoaded = false,
  accessToken = "",
  finishQuiz,
  skipQuiz,
  version
}) => {
  return (
    <div>
      <Switch>
        <Route path="/stats">
          <Link to='/load'>
            <BackIcon style={{ float: 'left', margin: 10}} fontSize='medium'/>
          </Link>
          <Stats accessToken={accessToken}/>
        </Route>
        <Route path="/load">
          <Load  version={version} isDataLoaded={isDataLoaded} loadFailed={loadFailed} accessToken={accessToken} onLoadData={(version) => {setVersion(version); loadData(accessToken, version)}} />
        </Route>
        <Route path="/app">
            <Link to='/load'>
            <BackIcon style={{ float: 'left', margin: 10}} fontSize='medium'/>
          </Link>
          <QueueManagement hasActiveChild={hasActiveChild} questionIndex={questionIndex} shouldRemoveChild={shouldRemoveChild}/>
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
        <Route path="/participants">
          <Link to='/load'>
            <BackIcon style={{ float: 'left', margin: 10}} fontSize='medium'/>
          </Link>
          <Participants accessToken={accessToken}/>
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
  shouldRemoveChild: PropTypes.bool
};

export default MainApp;

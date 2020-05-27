import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router';
import Quiz from './containers/Quiz';
import Home from './components/Home';
import Results from './components/Results'
import './App.css';
import { incrementQuizIndex, finishQuiz } from './actions/app';
import { connect } from 'react-redux';

function App({ quizIndex, quizData, incrementQuizIndex, quizIsLoaded, quizIsFinished }) {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/quiz'> 
        <Quiz
          quizIndex={quizIndex}
          quizData={quizData}
          quizIsLoaded={quizIsLoaded}
          incrementQuizIndex={incrementQuizIndex}
        />
      </Route>
      <Route exact path='/results'>
        <Results resultsAvailable={quizIsFinished}/>
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    quizIndex: state.appReducer.quizIndex,
    quizData: state.appReducer.quizData,
    quizIsLoaded: state.appReducer.quizIsLoaded,
    quizIsFinished: state.appReducer.quizIsFinished
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQuizIndex: () => dispatch(incrementQuizIndex()),
    finishQuiz: () => dispatch(finishQuiz())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

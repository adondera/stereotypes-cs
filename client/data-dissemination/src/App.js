import React, {useState, useEffect} from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router';
import Quiz from './containers/Quiz';
import Home from './components/Home';
import Results from './components/Results'
import './App.css';
import { incrementQuizIndex, finishQuiz, loadQuiz } from './actions/app';
import { connect } from 'react-redux';


function App({ quizIndex, quizData, incrementQuizIndex, quizIsLoaded, quizIsFinished, finishQuiz, loadQuiz, result }) {
  const [state, setstate] = useState(false)
  useEffect(() => {
    if(state === false) {
      console.log('mounted')
      loadQuiz()
      setstate(true)
    }
  }, [state, loadQuiz])
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
          finishQuiz={finishQuiz}
        />
      </Route>
      <Route exact path='/results'>
        <Results resultsAvailable={quizIsFinished} result={result}/>
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
    quizIsFinished: state.appReducer.quizIsFinished,
    result: state.appReducer.result
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQuizIndex: () => dispatch(incrementQuizIndex()),
    finishQuiz: () => dispatch(finishQuiz()),
    loadQuiz: () => dispatch(loadQuiz())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

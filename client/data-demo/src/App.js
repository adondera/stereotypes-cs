import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router';
import { Switch } from 'react-router';
import Quiz from './containers/Quiz';
import Home from './components/Home';
import Results from './components/Results'
import './App.css';
import { incrementQuizIndex, loadQuiz } from './actions/app';
import { sendQuiz } from './actions/quiz';
import { connect } from 'react-redux';


function App({ quizIndex, quizData, quizIsLoaded, quizResultAvailable, quizResultLoading, finishQuiz, loadQuiz, result }) {
  const [state, setstate] = useState(false)
  useEffect(() => {
    if(state === false) {
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
        {quizIsLoaded ? null : (<Redirect to='/'/>) }
        <Quiz
          quizIndex={quizIndex}
          quizData={quizData}
          quizIsLoaded={quizIsLoaded}
          incrementQuizIndex={incrementQuizIndex}
          finishQuiz={finishQuiz}
        />
      </Route>
      <Route exact path='/results'>
        <Quiz
            quizIndex={quizIndex}
            quizData={quizData}
            quizIsLoaded={quizIsLoaded}
            incrementQuizIndex={incrementQuizIndex}
            finishQuiz={finishQuiz}
          />
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
    quizResultLoading: state.appReducer.quizResultLoading,
    quizResultAvailable: state.appReducer.quizResultAvailable,
    result: state.appReducer.result
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    finishQuiz: (email) => {dispatch(sendQuiz(email));},
    loadQuiz: () => dispatch(loadQuiz())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

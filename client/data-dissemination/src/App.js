import React from 'react';
import { Route} from 'react-router';
import { Switch } from 'react-router';
import Home from './components/Home'
import './App.css';
import Likert from "./components/quizComponents/Likert";

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route exact path='/quiz'>
        <Quiz questionindex={1} correctAnswer='right'/>
      </Route>
      <Route exact path='/results'>
        Results
      </Route>
    </Switch>
  );
}

export default App;

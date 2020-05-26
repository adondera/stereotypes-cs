import React from 'react';
import { Route} from 'react-router';
import { Switch } from 'react-router';
import Home from './components/Home'
import './App.css';
import MultipleChoice from "./components/quizComponents/MultipleChoise";

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route exact path='/quiz'>
        <MultipleChoice/>
      </Route>
      <Route exact path='/results'>
        Results
      </Route>
    </Switch>
  );
}

export default App;

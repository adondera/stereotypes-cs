import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk';

const middlewareEnhancer = applyMiddleware(thunk)
const composedEnhancers = composeWithDevTools(middlewareEnhancer)
const initialStore = {appReducer: {quizIndex: 0, quizData: [{type: 1, correctAnswer: 'right'}, {type: 1, correctAnswer: 'right'}], quizIsLoaded: true, quizIsLoading: true}}
const store = createStore(rootReducer, initialStore,composedEnhancers);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

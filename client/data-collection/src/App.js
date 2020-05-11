import React from "react";
import "./App.css";
import Login from "./containers/Login";
import MainApp from "./components/MainApp";
import { connect } from "react-redux";
import { BrowserRouter, Redirect } from "react-router-dom";

const App = ({ isLoggedIn = false }) => {
  console.log(isLoggedIn);
  return (
    <div className="App">
      {isLoggedIn ? (
        <BrowserRouter>
          <Redirect exact to="/load" />
          <MainApp />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Redirect exct to="/login" />
          <Login />
        </BrowserRouter>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);

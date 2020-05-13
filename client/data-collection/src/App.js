import React from "react";
import "./App.css";
import Login from "./containers/Login";
import MainApp from "./containers/MainApp";
import { connect } from "react-redux";
import { BrowserRouter, Redirect } from "react-router-dom";

const App = ({ isLoggedIn = false }) => {
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

App.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default connect(mapStateToProps)(App);

import React from "react";
import "./App.css";
import Login from "./containers/Login";
import MainApp from "./components/MainApp"
import { connect } from "react-redux";

const App = ({ isLoggedIn = false }) => {
  console.log(isLoggedIn);
  return (
    <div className="App">
      {isLoggedIn ? <MainApp /> : <Login />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);

import React from "react";
import "./App.css";
import MainApp from "./containers/MainApp";
import { connect } from "react-redux";
import { BrowserRouter, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'

const noSelect = {
  WebkitUserSelect: "none", userSelect: 'none', WebkitTouchCallout: 'none'
}

const App = () => {
  return (
    <div className="App" style={{...noSelect}}>
        <BrowserRouter>
          <Redirect exact to="/load" />
          <MainApp /> 
        </BrowserRouter>
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

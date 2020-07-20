import React from "react";
import "./App.css";
import Home from './components/Home';
import {connect } from "react-redux";
import PropTypes from 'prop-types'

const App = () => {
  return (
    <Route exact path='/'>
      <Home />
    </Route>
  );
};

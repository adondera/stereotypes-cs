import React, { Component } from "react";
import Header from "./Form/Header";
import Body from "./Form/Body";
import Footer from "./Form/Footer";

class Form extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      text: "",
    };
  }
  changeText = (event) => {
    this.setState({ text: event.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <Body />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Form;

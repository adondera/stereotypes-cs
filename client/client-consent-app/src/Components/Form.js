import React, { Component } from "react";
import Header from "./Form/Header";
import Body from "./Form/Body";
import Footer from "./Form/Footer";
import "./Form/style/Form.css";

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
  onSubmit = (submitData) => () => {
    console.log(submitData);
  };
  render() {
    return (
      <div className="Form">
        <Header />
        <Body />
        <Footer onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default Form;

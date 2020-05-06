import React, { Component } from "react";
import Header from "./FormParts/Header";
import Body from "./FormParts/Body";
import Footer from "./FormParts/Footer";
import "./FormParts/style/Form.css";
import { postData } from "../utils/requests/postRequests";
import Loader from "../common/Loader";

class Form extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      text: "",
      isSubmitted: false,
      isLoading: false,
    };
  }

  changeText = (event) => {
    this.setState({ text: event.target.value });
  };
  onSubmit = (submitData) => () => {
    var str = JSON.stringify(submitData, null, 2); // spacing level = 2
    console.log(str);
    console.log(submitData);
    this.setState({ isLoading: true });
    // save the data.
    postData(
      submitData,
      () => {
        this.setState({ isSubmitted: true });
      },
      () => {
        this.setState({ isLoading: false });
      }
    );
  };

  render() {
    return (
      <div className="Form">
        {this.state.isSubmitted ? (
          <React.Fragment>SUBMIT OK PAGE</React.Fragment>
        ) : (
          <React.Fragment>
            {this.state.isLoading ? (
            <div className="Loading">
              <Loader size={document.documentElement.clientWidth*0.05}/>
            </div>
            ) : (
              <React.Fragment>
                <Header />
                <Body />
                <Footer onSubmit={this.onSubmit} />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Form;

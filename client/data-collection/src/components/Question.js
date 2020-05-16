import React, { Component } from "react";
import PropTypes from "prop-types";
import { createQuestion } from "../hoc/createQuestion";
import "../styles/Question.css"

class Question extends Component {

  getType() {
    console.log(this.props);
    return this.props.questionData.type;
  }

  render() {
    const quizStarted = this.props.quizStarted;

    return (
      <React.Fragment>
        {quizStarted ? (
          <div className="Question">
            <h1>{this.props.questionData.title}</h1>
            {this.props.children}
          </div>
        ) : (
          <div>QUIZ NOT STARTED</div>
        )}
      </React.Fragment>
    );
  }
}

Question.propTypes = {
  questionIndex: PropTypes.number,
  quizStarted: PropTypes.bool,
};

export default createQuestion(Question);

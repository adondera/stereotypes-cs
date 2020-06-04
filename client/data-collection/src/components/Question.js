import React, { Component } from "react";
import PropTypes from "prop-types";
import { createQuestion } from "../hoc/createQuestion";
import "../styles/Question.css"

class Question extends Component {

  getType() {
    return this.props.questionData.type;
  }

  render() {
    const quizStarted = this.props.quizStarted;

    return (
      <React.Fragment>
        {quizStarted ? (
          <div className="Question">
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
  questionData: PropTypes.object,
  children: PropTypes.any
};

export default createQuestion(Question);

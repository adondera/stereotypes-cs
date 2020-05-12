import React, { Component } from "react";
import PropTypes from "prop-types";
import { createQuestion } from "../hoc/createQuestion";

class Question extends Component {
  constructor(props) {
    super(props);
  }

  getType() {
    console.log(this.props);
    return this.props.questionData.type;
  }

  render() {
    const questionIndex = this.props.questionIndex;
    const quizStarted = this.props.quizStarted;

    return (
      <React.Fragment>
        {quizStarted ? (
          <React.Fragment>
            <h1>{this.props.questionData.title}</h1>
            <this.props.questionType
              {...this.props.questionData}
              onNext={() => this.props.onQuestionChange(questionIndex)}
              onFinish={() => this.props.onQuizFinished()}
            ></this.props.questionType>
          </React.Fragment>
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

import React, {Component} from "react";
import PropTypes from "prop-types";

class Question extends Component {
  constructor (props) {
    super(props)
  }
  render() {  
    
    const questionIndex = this.props.questionIndex;
    const quizStarted = this.props.quizStarted;

    return (
      <React.Fragment>
      { quizStarted ? (
        <React.Fragment>
            <h1> QUESTION: {questionIndex}</h1>
            <button onClick={() => this.props.onQuestionChange(questionIndex)}>Next</button>
          </React.Fragment>
      ) : (
          <div>
        QUIZ NOT STARTED
        </div>
      )}
      </React.Fragment>)
  }
}
  
  Question.propTypes = {
    questionIndex: PropTypes.number,
    quizStarted: PropTypes.bool
  };
  
  export default Question;
  
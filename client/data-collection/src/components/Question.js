import React from "react";
import PropTypes from "prop-types";

const Question = (props) => {
    
    return (
      <React.Fragment>
      { props.quizStarted ? (
        <React.Fragment>
            <h1> QUESTION: {props.questionIndex}</h1>
            <button onClick={() => props.onQuestionChange(props.questionIndex)}>Next</button>
          </React.Fragment>
      ) : (
          <div>
        QUIZ NOT STARTED
        </div>
      )}
      </React.Fragment>)
  };
  
  Question.propTypes = {
    questionIndex: PropTypes.number,
    quizStarted: PropTypes.bool
  };
  
  export default Question;
  
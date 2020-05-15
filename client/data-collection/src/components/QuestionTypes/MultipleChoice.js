import React, { useState } from "react";
import { saveQuestionAction } from "../../actions/question";
import { connect } from "react-redux";
import { Test, QuestionGroup, Question, Option } from "react-multiple-choice";

const MultipleChoice = (props) => {
  const [state, setQuestionAnswer] = useState({ answer: 0 });
  const onClick = () => {
    props.submitSelectedChoice(state.answer, props.type);
    props.onNext();
  };
  return (
    <React.Fragment>
      <div>
        <Test
          onOptionSelect={(selectedOptions) =>
            setQuestionAnswer({ answer: selectedOptions["selected-answer"] })
          }
        >
          <QuestionGroup questionNumber={"selected-answer"}>
            <Question>What is your favorite food?</Question>
            <Option value="1">Mac n Cheese</Option>
            <Option value="2">Steak</Option>
            <Option value="3">Sushi</Option>
            <Option value="4">Pad Thai</Option>
          </QuestionGroup>
        </Test>
      </div>
      <div>
        <button disabled={state.answer === 0} onClick={onClick}>
          NEXT
        </button>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitSelectedChoice: (answer, questionType) =>
      dispatch(saveQuestionAction(answer, questionType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);

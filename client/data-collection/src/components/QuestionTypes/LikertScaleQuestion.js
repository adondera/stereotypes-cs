import React, { useState } from "react";
import Likert from "react-likert-scale";
import { likertScaleText } from "../../utils/constants/LikertScale";
import { saveQuestionAction } from "../../actions/question";
import { connect } from "react-redux";


const LikertScaleQuestion = (props) => {
  const [state, setQuestionAnswer] = useState({ answer: 0 });
  const onClick = () => {
    props.submitSelectedScale(state.answer, props.type)
    props.onNext();
  };

  const likertOptions = {
    question: props.text,
    responses: likertScaleText.map((scaleText, index) => {
      return { value: index + 1, text: scaleText };
    }),
    picked: (val) => {
      setQuestionAnswer({ answer: val });
    },
  };
  return (
    <div>
      {/* LIKERT SCALE QUESTION */}
      <p>{props.text}</p>
      <img alt="" src={props.image} />
      <Likert {...likertOptions} />
      <button disabled={state.answer === 0} onClick={onClick}>
        NEXT
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitSelectedScale: (answer, questionType) =>
      dispatch(saveQuestionAction(answer, questionType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikertScaleQuestion);

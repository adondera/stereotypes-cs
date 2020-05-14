import React from "react";
import { connect } from "react-redux";
import { saveQuestionAction } from "../../actions/question";
import answers from "../../utils/constants/Answers";

const BinaryQuestion = (props) => {
  const onClickLeft = () => {
    props.onNext();
    props.onLeft(answers.LEFT, props.type);
  };
  const onClickRight = () => {
    props.onNext();
    props.onRight(answers.RIGHT, props.type);
  };
  return (
    <div>
      <p>{props.text}</p>
      <img src={props.image1} alt="image1" />
      <img src={props.image2} alt="image2" />
      <button onClick={onClickLeft}>LEFT</button>
      <button onClick={onClickRight}>RIGHT</button>
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
    onLeft: (answer, questionType) =>
      dispatch(saveQuestionAction(answer, questionType)),
    onRight: (answer, questionType) =>
      dispatch(saveQuestionAction(answer, questionType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BinaryQuestion);

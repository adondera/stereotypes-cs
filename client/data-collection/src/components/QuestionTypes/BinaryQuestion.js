import React from "react";
import { connect } from "react-redux";
import { saveQuestionAction } from "../../actions/question";
import answers from "../../utils/constants/Answers";
import Button from "@material-ui/core/Button";
import "../../styles/BinaryQuestion.css";

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
    <React.Fragment>
      <div className="header">
        <h3>{props.text}</h3>
      </div>

      <div className="content">
        <div className="body">
          <div className="containerLeft">
            <img className="imageLeft" src={props.image1} alt="image1" />
          </div>
          <div className="containerCenter">
            <span className="button">
              <Button
                size="large"
                type="button"
                variant="contained"
                color="primary"
                onClick={onClickLeft}
              >
                LEFT
              </Button>
            </span>
            <span className="button">
              <Button
                size="large"
                type="button"
                variant="contained"
                color="primary"
                onClick={onClickRight}
              >
                RIGHT
              </Button>
            </span>
          </div>
          <div className="containerRight">
            <img className="imageRight" src={props.image2} alt="image2" />
          </div>
        </div>
        {/* <div className="BinaryButtons"> */}
      </div>

      {/* </div> */}
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
    onLeft: (answer, questionType) =>
      dispatch(saveQuestionAction(answer, questionType)),
    onRight: (answer, questionType) =>
      dispatch(saveQuestionAction(answer, questionType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BinaryQuestion);

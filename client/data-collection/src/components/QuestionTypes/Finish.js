import React from "react";
import { clearQuestionsStore } from "../../actions/question";
import {connect} from "react-redux"
const Finish = (props) => {
  const onClick = () => {
    props.clearQuestionsStore();
    props.onFinish();
  };
  return (
    <div>
      <button onClick={onClick}>END</button>
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
    clearQuestionsStore: () => dispatch(clearQuestionsStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finish);

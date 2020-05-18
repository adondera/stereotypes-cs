import React from "react";
import { clearQuestionsStore } from "../../actions/question";
import {connect} from "react-redux"
import Button from "@material-ui/core/Button";
const Finish = (props) => {
  const onClick = () => {
    props.clearQuestionsStore();
    props.onFinish();
  };
  return (
    <div>
      <Button variant="contained" onClick={onClick}>
        END
      </Button>
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

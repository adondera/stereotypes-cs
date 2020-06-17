import React, { Fragment } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { registerChild, removeActiveChild } from "../actions/mainApp";
import { switchListening } from "../utils/sockets/queue";
import { Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import "../styles/Question.css";

const QueueManagament = (props) => {
  useEffect(() => {
    if (props.questionIndex === 0 && props.shouldRemoveChild) {
      props.removeChild();
      props.getChild();
    } else {
      if(!props.hasActiveChild) {
        props.getChild();
      }
    }
    // eslint-disable-next-line
  }, [props.questionIndex]);

  useEffect(() => {
    props.switchListenerState(props.hasActiveChild);
    // eslint-disable-next-line
  }, [props.hasActiveChild]);
  return (
    <Fragment>
      <div style={{paddingTop: 200}}>
      <Typography variant="h1">Hello,</Typography>
      <Typography className={"blink_me"} variant="h1" style={{ color: blue }}>
        {" " + props.activeChild.firstName + " "}
        {props.activeChild.lastName}
      </Typography>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    hasActiveChild: state.mainAppReducer.hasActiveChild,
    activeChild: state.mainAppReducer.activeChild,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchListenerState: (hasActiveChild) =>
      dispatch(switchListening(dispatch, hasActiveChild)),
    getChild: () => dispatch(registerChild(dispatch)),
    removeChild: () => dispatch(removeActiveChild()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QueueManagament);

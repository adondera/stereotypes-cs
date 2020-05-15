import React from "react";
import { connect } from "react-redux";
import { saveQuestionAction } from "../../actions/question";
import answers from "../../utils/constants/Answers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ImageCard from "./ImageCard"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
}));

const BinaryQuestion = (props) => {

  const classes = useStyles();

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
        <div className={classes.root}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <h3>{props.text}</h3>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImageCard image={props.image1} onClick={onClickLeft} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImageCard image={props.image2} onClick={onClickRight}/>
            </Grid>
          </Grid>
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
    onLeft: (answer, questionType) =>
        dispatch(saveQuestionAction(answer, questionType)),
    onRight: (answer, questionType) =>
        dispatch(saveQuestionAction(answer, questionType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BinaryQuestion);


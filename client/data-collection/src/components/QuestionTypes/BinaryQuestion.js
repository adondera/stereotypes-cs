import React from "react";
import { connect } from "react-redux";
import { saveQuestionAction } from "../../actions/question";
import answers from "../../utils/constants/Answers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ImageCard from "./ImageCard"
import TextCard from "./TextCard"
import {useEffect, useState} from "react"

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

  const onKeyUp = (event) => {
    if(event.key === "e") {
      setTimeout(onClickLeft, 300)
    }
    if(event.key === "i") {
      setTimeout(onClickRight, 300) 
      }
    }
  
  const onKeyDown = (event) => {
    if(event.key === "e") {
      setstate({...state, isLeftSelected: true})
    }
    if(event.key === "i") {
      setstate({...state, isRightSelected: true})
      }
    }

  const [state, setstate] = useState({questionIndex: props.questionIndex, isLeftSelected: false, isRightSelected: false})

  useEffect(() => {
    setstate({questionIndex: props.questionIndex, isLeftSelected: false, isRightSelected: false})
  }, [props.questionIndex])

  useEffect(() => {
    window.addEventListener("keyup", onKeyUp, true)
    window.addEventListener("keydown", onKeyDown, true)
    return () => {
      window.removeEventListener("keyup", onKeyUp, true)
      window.removeEventListener("keydown", onKeyDown, true)
    }
  })



  return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <ImageCard image={props.image} onClick={onClickLeft} isSelected={state.isLeftSelected}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextCard onClick={onClickLeft} text={props.textLeft} isSelected={state.isLeftSelected}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextCard onClick={onClickRight} text={props.textRight} isSelected={state.isRightSelected}/>
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


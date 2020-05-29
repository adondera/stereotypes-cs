import React from "react";
import { connect } from "react-redux";
import { saveQuestionAction } from "../../actions/question";
import answers from "../../utils/constants/Answers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ImageCard from "./ImageCard";
import TextCard from "./TextCard";
import { useEffect, useState } from "react";

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
  hide: {
    display: 'none'
  }
}));

const BinaryQuestion = (props) => {

  const classes = useStyles();
  const onClickLeft = (questionTime) => () => {
    props.onNext();
    const answer = {
      answers: [answers.LEFT],
      response_time: answers.TIME(questionTime),
    };
    props.onLeft(answer);
  };
  const onClickRight = (questionTime) => () => {
    props.onNext();
    const answer = {
      answers: [answers.RIGHT],
      response_time: answers.TIME(questionTime),
    };
    props.onLeft(answer);
  };

  const onKeyUp = (event) => {
    if (event.key === "e") {
      const questionTime = Date.now() - timer;
      setTimeout(onClickLeft(questionTime), 300);
    }
    if (event.key === "i") {
      const questionTime = Date.now() - timer;
      setTimeout(onClickRight(questionTime), 300);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "e") {
      setstate({ ...state, isLeftSelected: true });
    }
    if (event.key === "i") {
      setstate({ ...state, isRightSelected: true });
    }
  };

  const [state, setstate] = useState({
    questionIndex: props.questionIndex,
    isLeftSelected: false,
    isRightSelected: false,
  });

  const [timer, setTime] = useState(Date.now());
  useEffect(() => {
    setTime(Date.now());
    setstate({
      questionIndex: props.questionIndex,
      isLeftSelected: false,
      isRightSelected: false,
    });
  }, [props.questionIndex]);

  /*eslint-disable */
  useEffect(() => {
    window.addEventListener("keyup", onKeyUp, true);
    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.removeEventListener("keyup", onKeyUp, true);
      window.removeEventListener("keydown", onKeyDown, true);
      setimageLoaded(false)
    };
  }, [state.questionIndex]);

  const [imageLoaded, setimageLoaded] = useState(false)

  /*eslint-enable */
  console.log(props.categories_left);
  return (
    <div className={imageLoaded ? classes.root : classes.hide}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <ImageCard
            {...props}
            key={props.questionIndex}
            image={props.image.link}
            onClick={onClickLeft}
            onLoadImage={() => setimageLoaded(true)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextCard
            onClick={onClickLeft}
            categories={props.categories_left}
            isSelected={state.isLeftSelected}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextCard
            onClick={onClickRight}
            categories={props.categories_right}
            isSelected={state.isRightSelected}
          />
        </Grid>
      </Grid>
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
    onLeft: (answer) => {
      dispatch(saveQuestionAction(answer));
    },
    onRight: (answer) => {
      dispatch(saveQuestionAction(answer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BinaryQuestion);

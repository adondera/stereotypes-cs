import React from 'react';
import { connect } from 'react-redux';
import { saveQuestionAction } from '../../actions/question';
import answers from '../../utils/constants/Answers';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ImageCard from './ImageCard';
import TextCard from './TextCard';
import { useEffect, useState } from 'react';
import { KeyboardControls } from '../../utils/constants/Controls';
import CssBaseline from "@material-ui/core/CssBaseline";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '15%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
  hide: {
    display: 'none',
  },
}));

//Component for Binary question
const BinaryQuestion = (props) => {
  const classes = useStyles();

  //callback for calling left action
  const onClickLeft = (questionTime) => () => {
    const newAnswers = props.categories_left.map((category) =>
      parseInt(category.id)
    );
    const answer = {
      answers: [...newAnswers],
      img_id: props.image.link,
      response_time: answers.TIME(questionTime),
    };
    props.onAction(answer);
    props.onNext();
  };

  //callback for calling right action
  const onClickRight = (questionTime) => () => {
    const newAnswers = props.categories_right.map((category) =>
      parseInt(category.id)
    );
    const answer = {
      answers: [...newAnswers],
      img_id: props.image.link,
      response_time: answers.TIME(questionTime),
    };
    props.onAction(answer);
    props.onNext();
  };

  //callback for releasing key for controlling actions
  const onKeyUp = (event) => {
    if (KeyboardControls.LEFT.indexOf(event.key) > -1) {
      window.removeEventListener('keyup', onKeyUp, true);
      window.removeEventListener('keydown', onKeyDown, true);
      const questionTime = Date.now() - timer;
      setTimeout(onClickLeft(questionTime), 300);
    }
    if (KeyboardControls.RIGHT.indexOf(event.key) > -1) {
      window.removeEventListener('keyup', onKeyUp, true);
      window.removeEventListener('keydown', onKeyDown, true);
      const questionTime = Date.now() - timer;
      setTimeout(onClickRight(questionTime), 300);
    }
  };

  //callback for pressing the key down
  const onKeyDown = (event) => {
    if (KeyboardControls.LEFT.indexOf(event.key) > -1) {
      setstate({ ...state, isLeftSelected: true });
    }
    if (KeyboardControls.RIGHT.indexOf(event.key) > -1) {
      setstate({ ...state, isRightSelected: true });
    }
  };


  //use state inside the component to control particular attributes
  const [state, setstate] = useState({
    questionIndex: props.questionIndex,
    isLeftSelected: false,
    isRightSelected: false,
  });

  //set the timer when component is mount and initialize state
  const [timer, setTime] = useState(Date.now());
  useEffect(() => {
    setstate({
      questionIndex: props.questionIndex,
      isLeftSelected: false,
      isRightSelected: false,
    });
  }, [props.questionIndex]);

  //prepare event listeners when component is mount and clear state when unmount
  /*eslint-disable */
  useEffect(() => {
    window.addEventListener('keyup', onKeyUp, true);
    window.addEventListener('keydown', onKeyDown, true);

    return () => {
      setimageLoaded(false);
    };
  }, [state.questionIndex]);

  const [imageLoaded, setimageLoaded] = useState(false);

  //watch the changes in props for updating the component
  useEffect(() => {
    if (imageLoaded) {
      setTime(Date.now());
    }
  }, [imageLoaded]);

  return (
    <div className={imageLoaded ? classes.root : classes.hide}>
      <CssBaseline/>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <ImageCard
            {...props}
            key={props.questionIndex}
            image={props.image.link}
            onClick={onClickLeft}
            imageLoaded={imageLoaded}
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
    onAction: (answer) => {
      dispatch(saveQuestionAction(answer));
    },
  };
};

//connect component to store
export default connect(mapStateToProps, mapDispatchToProps)(BinaryQuestion);

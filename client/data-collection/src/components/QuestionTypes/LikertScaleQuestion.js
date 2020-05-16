import React, { useState } from "react";
import Likert from "react-likert-scale";
import { likertScaleText } from "../../utils/constants/LikertScale";
import { saveQuestionAction } from "../../actions/question";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../../styles/Question.css"
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
  nextButton: {
    margin: 20,
  },
  likert: {
    marginTop: 40
  }
}));

const LikertScaleQuestion = (props) => {
  const classes = useStyles();
  const [state, setQuestionAnswer] = useState({ answer: 0 });
  const onClick = () => {
    props.submitSelectedScale(state.answer, props.type);
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
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Card className={classes.root}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.text}
                </Typography>
                  <Likert {...likertOptions} className="likertScale" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Button
          className={classes.nextButton}
          variant="contained"
          disabled={state.answer === 0}
          onClick={onClick}
        >
          NEXT
        </Button>
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
    submitSelectedScale: (answer, questionType) =>
      dispatch(saveQuestionAction(answer, questionType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikertScaleQuestion);

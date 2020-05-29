import "../../styles/Question.css"
import React, { useState } from "react";
import Likert from "react-likert-scale"
import { likertScaleText } from "../../utils/constants/LikertScale";
import { saveQuestionAction } from "../../actions/question";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide"
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
  const [state, setQuestionAnswer] = useState({ answers: [] });
  const onClick = () => {
    props.submitSelectedScale(state);
    props.onNext();
    setQuestionAnswer({answers: []})
  };

  const likertOptions = {
    responses: likertScaleText.map((scaleText, index) => {
      return { value: index + 1, text: scaleText };
    }),
    picked: (val) => {
      setQuestionAnswer({ answers: [parseInt(val)] });
    },
  };
  

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Slide direction="down" in={true} key={props.questionIndex} mountOnEnter>
            <Card className={classes.root}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.text}
                </Typography>
                  <Likert key={props.questionIndex} {...likertOptions} className="likertScale" />
              </CardContent>
            </Card>
            </Slide>
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
    submitSelectedScale: (answer) =>
    {
      dispatch(saveQuestionAction(answer))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikertScaleQuestion);

import React, { useState } from "react";
import { saveQuestionAction } from "../../actions/question";
import { connect } from "react-redux";
import { Test, QuestionGroup, Option } from "react-multiple-choice";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react"
import "../../styles/Question.css";

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
      marginTop: 20
  },
  choices: {
      margin: "auto"
  }
}));

const MultipleChoice = (props) => {
  const classes = useStyles();
  const [state, setQuestionAnswer] = useState({ answer: 0 });
  const onClick = () => {
    props.submitSelectedChoice(state.answer, props.type);
    props.onNext();
  };
  const onSelectedOption = (selectedOptions) => {
    setQuestionAnswer({
      answer: selectedOptions["selected-answer"],
    });
  };

  useEffect(() => {
    setQuestionAnswer({answer: 0})
  }, [props.questionIndex])
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.root}>
              <Typography gutterBottom variant="h5" component="h2">
                {props.text}
              </Typography>
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                ></Typography>
                <Test
                className={classes.choices}
                  onOptionSelect={onSelectedOption}
                >
                  <QuestionGroup key={props.questionIndex} questionNumber={"selected-answer"}>
                      {props.options.map((option, index) => {
                          return (
                          <Option key={index} value={(index+1).toString()}>{option}</Option>
                          )
                      })}
                  </QuestionGroup>
                </Test>
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
    submitSelectedChoice: (answer, questionType) =>
    {
      const data = {answer: answer}
      dispatch(saveQuestionAction(data, questionType))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);

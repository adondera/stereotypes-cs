import React, { useState } from "react";
import { saveQuestionAction } from "../../actions/question";
import { connect } from "react-redux";
import { Test, QuestionGroup, Option } from "react-multiple-choice";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
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
    marginTop: 20,
  },
  choices: {
    margin: "auto",
  },
}));

const MultipleChoice = (props) => {
  const classes = useStyles();
  const [state, setQuestionAnswer] = useState({ answers: [] });
  const onClick = () => {
    props.submitSelectedChoice(state);
    props.onNext();
    setQuestionAnswer({ answers: [] });
  };
  const onSelectedOption = (selectedOption) => {
    setQuestionAnswer({
      answers: [parseInt(selectedOption["selected-answer"])],
    });
  };
  console.log(props)

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Slide
              direction="down"
              in={true}
              key={props.questionIndex}
              mountOnEnter
            >
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
                    <QuestionGroup
                      key={props.questionIndex}
                      questionNumber={"selected-answer"}
                    >
                      {props.choices.map((option, index) => {
                        return (
                          <Option key={index} value={(option.choice_num).toString()}>
                            {option.text}
                          </Option>
                        );
                      })}
                    </QuestionGroup>
                  </Test>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        </Grid>
        <Button
          className={classes.nextButton}
          variant="contained"
          disabled={state.answers.length === 0}
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
    submitSelectedChoice: (answer) => {
      dispatch(saveQuestionAction(answer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);

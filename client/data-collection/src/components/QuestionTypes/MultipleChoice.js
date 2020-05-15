import React, { useState } from "react";
import { saveQuestionAction } from "../../actions/question";
import { connect } from "react-redux";
import { Test, QuestionGroup, Question, Option } from "react-multiple-choice";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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

const MultipleChoice = (props) => {
  const classes = useStyles();
  const [state, setQuestionAnswer] = useState({ answer: 0 });
  const onClick = () => {
    props.submitSelectedChoice(state.answer, props.type);
    props.onNext();
  };
  return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <Card className={classes.root}>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.text}
                </Typography>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <div>
                      <Test
                          onOptionSelect={(selectedOptions) =>
                              setQuestionAnswer({
                                answer: selectedOptions["selected-answer"],
                              })
                          }
                      >
                        <QuestionGroup questionNumber={"selected-answer"}>
                          <Option value="1">Mac n Cheese</Option>
                          <Option value="2">Steak</Option>
                          <Option value="3">Sushi</Option>
                          <Option value="4">Pad Thai</Option>
                        </QuestionGroup>
                      </Test>
                    </div>
                    <Button
                        variant="contained"
                        disabled={state.answer === 0}
                        onClick={onClick}
                    >
                      NEXT
                    </Button>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
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
    submitSelectedChoice: (answer, questionType) =>
        dispatch(saveQuestionAction(answer, questionType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);

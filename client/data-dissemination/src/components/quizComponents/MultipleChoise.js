import React, { useState } from "react";
import { Test, QuestionGroup, Option } from "react-multiple-choice";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import "../../styles/MultipleChoice.css";
import { useStyles } from "../../styles/MultipleChoice";

const MultipleChoice = (props) => {
  const classes = useStyles();
  const [picked, setpicked] = useState(false);

  const onClick = () => {
    const answer = { value: picked, id: props.id };
    props.registerAnswer(answer);
    props.onNext();
  };

  return (
      <div>
        <Grid container spacing={3} alignItems="center" justify="center">
          {/*title*/}
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <Typography variant="h3">{props.text}</Typography>
            </Paper>
          </Grid>
        </Grid>
        {/*options*/}
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid
              className="Test"
              item
              xs={12}
              sm={6}
              style={{ textAlign: "center" }}
          >
            <Test
                style={{ width: "70%" }}
                onOptionSelect={(answers) => setpicked(answers["question"])}
            >
              <QuestionGroup
                  className="Options"
                  key={props.questionIndex}
                  questionNumber={"question"}
              >
                {props.choices.map((option, key) => (
                    <Option
                        key={option.choice_num}
                        style={{ color: "#3F51B5" }}
                        value={option.choice_num.toString()}
                    >
                      {option.text.toString()}
                    </Option>
                ))}
              </QuestionGroup>
            </Test>
          </Grid>
          {/*button*/}
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper} elevation={0}>
              <Link to="/quiz" style={{ textDecoration: "none" }}>
                <Button
                    style={{ margin: "auto" }}
                    variant="contained"
                    color="primary"
                    onClick={onClick}
                    disabled={!picked}
                >
                  NEXT
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
  );
};

export default MultipleChoice;

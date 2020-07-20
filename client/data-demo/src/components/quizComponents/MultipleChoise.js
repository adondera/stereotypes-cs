import React, { useState, useEffect } from "react";
import { Typography, Grid, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import "../../styles/MultipleChoice.css";
import { useStyles } from "../../styles/MultipleChoice";

const MultipleChoice = (props) => {
  const classes = useStyles();
  const [picked, setpicked] = useState(0);

  // action to be performed
  // when questionId changes.
  useEffect(() => {
    setpicked(0)
  }, [props])

  // on click action
  // saves the result to the store.
  const onClick = () => {
    const answer = { answers: picked, question_id: props.id };
    props.registerAnswer(answer);
    props.onNext();
  };

  return (
    <div>
      <Grid container spacing={3} alignItems="center" justify="center">
        {/*title*/}
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">{props.text}</Typography>
          </Paper>
        </Grid>
      </Grid>
      {/*options*/}
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item xs={8} sm={4}>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={picked}
          onChange={(event) => {setpicked(parseInt(event.target.value));}}
        >
          {props.choices.map((option, index) => {
            var isSelected = option.choice_num === picked;
            return (
              <div
                  key={index}
                  style={{                 
                  margin: 'auto',
                  marginTop:'0.5em',
                  marginBottom:'0.5em',
                  width: '70%',
                  textAlign: "center",
                  padding: "0.5em",
                  borderRadius: 8,
                  backgroundColor: isSelected ? "rgba(63,81,181,0.1)" : 'whitesmoke',
                }}
              >
                <FormControlLabel
                  className="controlLabel"
                  style={{ width: "100%", margin: "auto" }}
                  value={option.choice_num}
                  control={<Radio color="primary" checked={isSelected} />}
                  label={option.text}
                />
              </div>
            );
          })}
        </RadioGroup>
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

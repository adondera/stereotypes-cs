import React, { useState } from "react";
import Likert from "react-likert-scale";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import "../../styles/Likert.css";
import { useStyles } from "../../styles/Likert";

const LikertScaleQuestion = (props) => {
  const classes = useStyles();
  const [picked, setpicked] = useState(false);

  // action to be performed on click
  const onClick = () => {
    const answer = { answers: parseInt(picked), question_id: props.id };
    props.registerAnswer(answer);
    props.onNext();
  };

  //list of all the options
  const likertOptions = {
    responses: [
      { value: 1, text: "1" },
      { value: 2, text: "2" },
      { value: 3, text: "3" },
      { value: 4, text: "4" },
      { value: 5, text: "5" },
    ],
    picked: (value) => setpicked(value),
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item xs={12}>
          <Slide
            direction="down"
            in={true}
            key={props.questionIndex}
            mountOnEnter
          >
            {/*main card*/}
            <Card className={classes.root}>
              <CardContent>
                {/*title*/}
                <Typography style={{ textAlign: "center" }} variant="h4">
                  {props.text}
                </Typography>
              </CardContent>
            </Card>
          </Slide>
          <Grid item xs={12}>
            <Paper>
              <Likert
                key={props.questionIndex}
                {...likertOptions}
                className="likertScale"
              />
            </Paper>
          </Grid>
        </Grid>
        {/*button*/}
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper} elevation={0}>
            <Link to="/quiz" style={{ textDecoration: "none" }}>
              <Button
                style={{ margin: "auto" }}
                variant="contained"
                color="primary"
                disabled={!picked}
                onClick={onClick}
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

export default LikertScaleQuestion;

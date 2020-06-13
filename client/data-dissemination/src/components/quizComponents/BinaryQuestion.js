import React, { useState, useEffect } from "react";
import {
  responsiveFontSizes,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import ImageCard from "./ImageCard";
import ChoiceCard from "./ChoiceCard";
import { useStyles } from "../../styles/BinaryQuestion";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const BinaryQuestion = (props) => {
  const classes = useStyles();
  const [start, setstart] = useState(Date.now);
  const [wrong, setwrong] = useState(false);

  useEffect(() => {
    setstart(Date.now());
  }, []);

  // save answer to store
  const sumbitAnswerToStore = () => {
    const time = Date.now() - start;
    const answer = { time: time, wrong: wrong, id: props.id };
    console.log(Date.now() - start);
    props.registerAnswer(answer);
    setTimeout(props.onNext, 200);
  };
  // handle click on left pad
  const onClickLeft = () => {
    console.log(props.correctAnswer);
    if (props.image.category === props.categories_left[0].name) {
      //TODO! change what goes into store !!!
      sumbitAnswerToStore();
    } else {
      setwrong(true);
    }
  };

  // handle click on right pad
  const onClickRight = () => {
    if (props.image.category === props.categories_right[0].name) {
      //TODO! change what goes into store !!!
      sumbitAnswerToStore();
    } else {
      setwrong(true);
    }
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={0.5}>
          <Grid className={classes.paper} item xs={4}>
            <Typography variant="h5">
              {props.categories_left[0].name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h3"
              align="center"
              style={{ visibility: wrong ? "visible" : "hidden", color: "red" }}
            >
              X
            </Typography>
          </Grid>
          <Grid className={classes.paper} item xs={4}>
            <Typography variant="h5">
              {props.categories_right[0].name}
            </Typography>
          </Grid>
            <ChoiceCard onClick={onClickLeft} />
          <Grid item xs={4}>
            <ImageCard image={props.image.link}></ImageCard>
          </Grid>
            <ChoiceCard onClick={onClickRight}/>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default BinaryQuestion;

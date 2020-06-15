import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import ImageCard from "./ImageCard";
import ChoiceCard from "./ChoiceCard";
import { useStyles } from "../../styles/BinaryQuestion";

const BinaryQuestion = (props) => {
  const classes = useStyles();
  const [start, setstart] = useState(Date.now);
  const [wrong, setwrong] = useState(0);

  //on mount reset answer variables
  useEffect(() => {
    setstart(Date.now());
    setwrong(0);
  }, []);

  // save answer to store
  const sumbitAnswerToStore = () => {
    const time = Date.now() - start;
    const answer = {
      response_time: time,
      answers: wrong,
      question_id: props.id,
      img_id: props.image.link,
    };
    console.log(Date.now() - start);
    props.registerAnswer(answer);
    setTimeout(props.onNext, 200);
  };

  // handle click on left pad
  const onClickLeft = () => {
    console.log(props.correctAnswer);
    if (props.image.category === props.categories_left[0].name) {
      sumbitAnswerToStore();
    } else {
      setwrong(wrong + 1);
    }
  };

  // handle click on right pad
  const onClickRight = () => {
    if (props.image.category === props.categories_right[0].name) {
      sumbitAnswerToStore();
    } else {
      setwrong(wrong + 1);
    }
  };

  return (
    <div className={classes.root}>
        <Grid container spacing={0.5}>
          {/* left text */}
          <Grid className={classes.paper} item xs={4}>
            <Typography variant="h5">
              {props.categories_left[0].name}
            </Typography>
          </Grid>
          {/* X */}
          <Grid item xs={4}>
            <Typography
              variant="h3"
              align="center"
              style={{ visibility: wrong ? "visible" : "hidden", color: "red" }}
            >
              X
            </Typography>
          </Grid>
          {/* right text */}
          <Grid className={classes.paper} item xs={4}>
            <Typography variant="h5">
              {props.categories_right[0].name}
            </Typography>
          </Grid>
          {/* choice card left */}
          <ChoiceCard onClick={onClickLeft} />
          <Grid item xs={4}>
            {/* image card */}
            <ImageCard image={props.image.link}></ImageCard>
          </Grid>
          {/* choice card right */}
          <ChoiceCard onClick={onClickRight} />
        </Grid>
    </div>
  );
};

export default BinaryQuestion;

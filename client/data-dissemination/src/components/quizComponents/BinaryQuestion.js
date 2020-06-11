import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Slide } from "@material-ui/core";
import ImageCard from "./ImageCard";
import ChoiceCard from "./ChoiceCard";
import { useStyles } from "../../styles/BinaryQuestion";

const BinaryQuestion = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({ choice: null });
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
      setState({ choice: props.categories_left[0].name });
      sumbitAnswerToStore();
    } else {
      setwrong(true);
    }
  };
  // handle click on right pad
  const onClickRight = () => {
    if (props.image.category === props.categories_right[0].name) {
      //TODO! change what goes into store !!!
      setState({ choice: props.categories_right[0].name });
      sumbitAnswerToStore();
    } else {
      setwrong(true);
    }
  };

  return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          {/* left text here*/}
          <Grid className={classes.paper} item xs={4}>
            <Typography variant="h5">{props.categories_left[0].name}</Typography>
          </Grid>
          <Grid item xs={4} />
          {/* right text here*/}
          <Grid className={classes.paper} item xs={4}>
            <Typography variant="h5">{props.categories_right[0].name}</Typography>
          </Grid>
          {/* left pad here*/}
          <Grid item xs={4}>
            <ChoiceCard
                correct={props.categories_left[0].name === props.image.category}
                onClick={onClickLeft}
                isSelected={true}
            />
            {/* image here*/}
          </Grid>
            <Grid item xs={4}>
              <ImageCard {...props} image={props.image.link} />
            </Grid>
          {/* right pad here*/}
          <Grid item xs={4}>
            <ChoiceCard
                correct={props.categories_right[0].name === props.image.category}
                onClick={onClickRight}
                isSelected={true}
            />
          </Grid>
        </Grid>
      </div>
  );
};

export default BinaryQuestion;

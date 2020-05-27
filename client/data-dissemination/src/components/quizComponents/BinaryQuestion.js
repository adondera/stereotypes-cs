import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Slide } from '@material-ui/core';
import ImageCard from './ImageCard';
import ChoiceCard from './ChoiceCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    margin: 'auto',
    flexGrow: 1,
    marginTop: '20%',
  },
  paper: {
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rootBeforeChoice: {
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    pointerEvents: 'none',
  },
  card: {
    maxWidth: 345,
  },
}));

const BinaryQuestion = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({ choice: null });

  const onClickLeft = () => {
    console.log(props.correctAnswer);
    if (props.correctAnswer === 'left') {
      setState({ choice: 'right' });
      props.registerAnswer({});
      setTimeout(props.onNext, 200)
    }
  };
  const onClickRight = () => {
    if (props.correctAnswer === 'right') {
      setState({ choice: 'left' });
      props.registerAnswer({});
      setTimeout(props.onNext, 200)
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid className={classes.paper} item xs={4}>
          <Typography variant='h5'>{props.textLeft}</Typography>
        </Grid>
        <Grid item xs={4} />
        <Grid className={classes.paper} item xs={4}>
          <Typography variant='h5'>{props.textRight}</Typography>
        </Grid>
        <Grid item xs={4}>
          <ChoiceCard
            correct={props.correctAnswer === 'left'}
            onClick={onClickLeft}
            isSelected={true}
          />
        </Grid>
        <Slide in={state.choice === null} direction={state.choice}>
          <Grid item xs={4}>
            <ImageCard {...props} image={props.image} />
          </Grid>
        </Slide>
        <Grid item xs={4}>
          <ChoiceCard
            correct={props.correctAnswer === 'right'}
            onClick={onClickRight}
            isSelected={true}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BinaryQuestion;

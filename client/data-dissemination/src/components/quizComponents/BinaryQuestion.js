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
    pointerEvents: 'none'
  },
  card: {
    maxWidth: 345,
  },
}));

const BinaryQuestion = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({ choice: null });

  const onClickLeft = () => {
    console.log(props.correctAnswer)
    if(props.correctAnswer === 'left') {
      setState({ choice: 'right' })
      props.onNext()
    }
  }
  const onClickRight = () => {
    if(props.correctAnswer === 'right') {
      setState({ choice:'left'})
      props.registerAnswer({})
      props.onNext()
    } 
  }

  return ( 
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid className={classes.paper} item xs={4}>
            <Typography variant='h5'>Cat</Typography>
          </Grid>
          <Grid item xs={4} />
          <Grid className={classes.paper} item xs={4}>
            <Typography variant='h5'>Dog</Typography>
          </Grid>
          <Grid item xs={4}>
            <ChoiceCard
              correct={props.correctAnswer === 'left'}
              onClick={onClickLeft}
              text='Stanga'
              isSelected={true}
            />
          </Grid>
          <Slide in={state.choice === null} direction={state.choice}>
            <Grid item xs={4}>
              <ImageCard
                {...props}
                image='https://perol.ro/wp-content/uploads/2019/10/caine-1-768x400.jpg'
              />
            </Grid>
          </Slide>
          <Grid item xs={4}>
            <ChoiceCard
              correct={props.correctAnswer === 'right'}
              onClick={onClickRight}
              text='Dreapta'
              isSelected={true}
            />
          </Grid>
        </Grid>
      </div>
  );
};

export default BinaryQuestion;

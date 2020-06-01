import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    margin: 'auto',
    width: '90%',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            <Typography variant='h3'>Stereotypes in CS</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography style={{ textAlign: 'justify' }} variant='h6'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ultrices tincidunt arcu non sodales neque sodales. Ut diam quam
              nulla
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography style={{ textAlign: 'justify' }} variant='h6'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ultrices tincidunt arcu non sodales neque sodales. Ut diam quam
              nulla
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            <Link to='/quiz' style={{textDecoration: 'none'}}>
            <Button
              style={{ margin: 'auto' }}
              variant='contained'
              color='secondary'>
                  Start
            </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

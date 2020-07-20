import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
// import Paper from '@material-ui/core/Paper';

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
        <Grid item xs={12} sm={12} style={{textAlign: 'center'}}>
            <Typography variant='h3'>Demonstratie</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography style={{ textAlign: 'justify' }} variant='h6'>
              {/* ADD YOUR TEXT HERE - Use Paper import to wrap text */}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography style={{ textAlign: 'justify' }} variant='h6'>
              {/* ADD YOUR TEXT HERE - Use Paper import to wrap text*/}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={12} style={{textAlign: 'center'}}>
            <Link to='/quiz' style={{textDecoration: 'none'}}>
            <Button
              style={{ margin: 'auto'}}
              variant='contained'
              color='secondary'>
                  Start
            </Button>
            </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

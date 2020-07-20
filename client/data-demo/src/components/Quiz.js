import React from 'react';
import { createQuizComponent } from '../hoc/createQuizComponent'
import {Grid, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {
  responsiveFontSizes,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
//responsive font sizes
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
    root: {
      width: '95%',
      margin: 'auto',
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(0.5),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
      maxWidth: 345,
    },
  }));

  const Quiz  = (props) => {
    const classes = useStyles() 
        return (
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Grid container spacing={0}>
            {/* <Grid className={classes.paper} item xs={12}>
            <Typography variant='h2'>{props.quizIndex}</Typography>
            </Grid> */}
          </Grid>
        </div>
            {props.children}
      </ThemeProvider>
        )
};

export default createQuizComponent(Quiz)


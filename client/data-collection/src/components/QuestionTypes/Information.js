import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


const Information = (props) => {
  /*eslint-disable */
  const classes = useStyles()

  const [hasNext, sethasNext] = useState(false)
  const [startsIn, setStartIn] = useState(false)


  return (
    <React.Fragment>
      <CssBaseline />
        {startsIn ? (  
          <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >{startsIn}</Typography>) : (
          <React.Fragment>
        <Container maxWidth="sm" component="main" className={classes.heroContent}>      
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {props.header}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          {props.text}
        </Typography>
      </Container>
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => {sethasNext(true); setTimeout(props.onNext, 4000); setStartIn(3); setTimeout(() => setStartIn(2), 1000); setTimeout(() => setStartIn(1), 2000); setTimeout(() => setStartIn('Start!'), 3000) }}
        disabled={hasNext}
      >
        NEXT
      </Button>
      </React.Fragment>
        )
        }
    </React.Fragment>
  );
};

export default Information;

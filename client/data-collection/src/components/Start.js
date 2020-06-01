import Button from "@material-ui/core/Button";
import React from "react";
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


const Start = (props) => {
  const classes = useStyles()
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Stereotypes in CS 
      </Typography>
      <Typography variant="h5" align="justify" color="textSecondary" component="p">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt
        arcu non sodales neque sodales. Ut diam quam nulla porttitor massa id.
        Ornare arcu odio ut sem nulla pharetra diam. Eu volutpat odio facilisis
        mauris sit amet massa vitae. Mi ipsum faucibus vitae aliquet nec
        ullamcorper. Nunc mi ipsum faucibus vitae. Ut faucibus pulvinar
        elementum integer enim neque volutpat ac
      </Typography>
    </Container>
    <Button
        style={{ marginTop: 20 }}
        variant="contained"
        onClick={props.onClick}
        color="primary"
        disabled={!props.canStart}
      >
        Start
      </Button>
  </React.Fragment>
  );
};

export default Start;

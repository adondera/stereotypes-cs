import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useStyles from '../../styles/Information'

const Information = (props) => {
  /*eslint-disable */
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          variant="h4"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          {props.text}
        </Typography>
      </Container>
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={props.onNext}
      >
        VOLGENDE
      </Button>
    </React.Fragment>
  );
};

export default Information;

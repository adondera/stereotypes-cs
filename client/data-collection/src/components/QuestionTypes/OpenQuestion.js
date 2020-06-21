import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { connect } from 'react-redux';
import { saveQuestionAction } from '../../actions/question';

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
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
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const OpenQuestion = (props) => {
  /*eslint-disable */
  const classes = useStyles();
  const textRef = React.createRef()

  const onClick = () => {
    var answer = {}
    answer.question_id = props.id
    answer.open_answer = textRef.current.value
    props.submitAnswer(answer)
    props.onNext()
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          component="p"
        >
          {props.text}
        </Typography>
      </Container>
      <Grid item xs={12} sm={12}>
        <TextField
          id="outlined-multiline-static"
          label="Antwoord hier"
          multiline
          rows={4}
          style={{width: '50%'}}
          inputRef={textRef}
          autoFocus
          defaultValue=""
          variant="outlined"
        />
      </Grid>
      <Grid>
        <Button
          style={{ margin: "auto" }}
          variant="contained"
          style={{ marginTop: 20 }}
          onClick={onClick}
        >
          VOLGENDE
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitAnswer: (answer) => {
      dispatch(saveQuestionAction(answer));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenQuestion);
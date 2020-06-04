import React from "react";
import {
  clearQuestionsStore,
  sendQuestionsAnswers,
} from "../../actions/question";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import {
  Typography,
  TextField,
  Grid
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";

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

const ResearcherNotes = (props) => {
  const classes = useStyles();
  const notesRef = React.createRef()
  //sequence of actions to be dispatched whne quiz ends
  const onClickFinish = () => {
    const notes = notesRef.current.value
    props.sendQuestionsAnswers(props.childId,notes);
    props.clearQuestionsStore();
    props.onFinish();
  };


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
          {props.title}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          {props.text}
        </Typography>
      </Container>
      <Grid item xs={12} style={{margin: 'auto'}}>
        <TextField
        inputRef={notesRef}
            style={{width: '50%'}}
        rows={10}
          autoFocus
          multiline
          variant="outlined"
        />
      </Grid>
      <Grid>
        <Button
          style={{ marginTop: 20 }}
          variant="contained"
          onClick={onClickFinish}
        >
            FINISH
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    childId: state.mainAppReducer.activeChild.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendQuestionsAnswers: (childId, notes) => dispatch(sendQuestionsAnswers(childId, notes)),
    clearQuestionsStore: () => dispatch(clearQuestionsStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResearcherNotes);

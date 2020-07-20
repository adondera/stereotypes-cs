import React, {useState, useEffect} from "react";
import {saveQuestionAction} from '../../actions/question'
import {
  clearQuestionsStore,
  sendQuestionsAnswers,
} from "../../actions/question";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import {
  Typography,
  TextField,
  Grid,
  InputLabel
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
    props.submitNotes({question_id: props.id, open_answer: notes})
    props.sendQuestionsAnswers(props.childId,notes);
  };

  const [sendRequested, setsendRequested] = useState(false)
  const [dataFailed, setdataFailed] = useState(false)

  useEffect(() => {
    if(props.sendDataStatus === 1 ) {
      props.clearQuestionsStore();
      props.onFinish();
    }
    if(props.sendDataStatus === 2) {
      setdataFailed(true)
      setTimeout(() => {
        props.clearQuestionsStore();
        props.onFinish();
      }, 6000)
    }
  }, [props])


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
          onClick={() => {setsendRequested(true); onClickFinish()}}
          disabled={sendRequested}
        >
            AF HEBBEN
        </Button>
      </Grid>
      <Grid>
        <InputLabel error style={{visibility: dataFailed ? 'visible' : 'hidden', marginTop: 20}}>
          Data failed to be sent. NO data was lost! Data has been printed in logs. You will now be redirected to main page.
        </InputLabel>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    sendDataStatus: state.mainAppReducer.sendDataStatus,
    childId: state.mainAppReducer.activeChild.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNotes: (answer) => dispatch(saveQuestionAction(answer)),
    sendQuestionsAnswers: (childId, notes) => dispatch(sendQuestionsAnswers(childId, notes, dispatch)),
    clearQuestionsStore: () => dispatch(clearQuestionsStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResearcherNotes);

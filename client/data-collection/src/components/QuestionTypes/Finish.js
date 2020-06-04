import React, { useState } from "react";
import {
  clearQuestionsStore,
  sendQuestionsAnswers,
} from "../../actions/question";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import {
  Typography,
  Checkbox,
  TextField,
  FormControlLabel,
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

const Finish = (props) => {
  const classes = useStyles();

  const [finish, setfinish] = useState(true);
  const [researcherCode, setresearcherCode] = useState("");

  const onCheck = (event) => {
    setfinish(!event.target.checked);
  };

  //sequence of actions to be dispatched whne quiz ends
  const onClickFinish = () => {
    console.log('STARTED')
    props.sendQuestionsAnswers(props.childId);
    console.log('FINISHED')
    props.clearQuestionsStore();
    props.onFinish();
  };

  const onClickNext = () => {
    props.onNext();
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
      <Grid item xs={6} style={{margin: 'auto'}}>
        <TextField
          autoFocus
          type='password'
          onChange={(event) => setresearcherCode(event.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6} style={{margin: 'auto'}}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!finish}
              onChange={onCheck}
              name="checkedB"
              color="primary"
            />
          }
          label="Research notes"
        />
      </Grid>
      <Grid>
        <Button
          style={{ marginTop: 20 }}
          variant="contained"
          onClick={finish ? onClickFinish : onClickNext}
          disabled={researcherCode !== "NEMO"}
        >
          {finish ? <span>END</span> : <span>NEXT</span>}
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
    sendQuestionsAnswers: (childId) => dispatch(sendQuestionsAnswers(childId)),
    clearQuestionsStore: () => dispatch(clearQuestionsStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finish);

import React, { useState, useEffect } from "react";
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
  Grid,
  InputLabel
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useStyles from "../../styles/Finish";


const Finish = (props) => {
  const classes = useStyles();

  const [finish, setfinish] = useState(true);
  const [sendRequested, setsendRequested] = useState(false)
  const [researcherCode, setresearcherCode] = useState("");
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

  const onCheck = (event) => {
    setfinish(!event.target.checked);
  };

  //sequence of actions to be dispatched whne quiz ends
  const onClickFinish = () => {
    props.sendQuestionsAnswers(props.childId);
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
          variant="h1"
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
          onClick={finish ? () => {setsendRequested(true); onClickFinish()} : onClickNext}
          disabled={researcherCode !== "NEMO" || dataFailed || sendRequested}
        >
          {finish ? <span>EINDE</span> : <span>VOLGENDE</span>}
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
    sendQuestionsAnswers: (childId) => dispatch(sendQuestionsAnswers(childId, '', dispatch)),
    clearQuestionsStore: () => dispatch(clearQuestionsStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finish);

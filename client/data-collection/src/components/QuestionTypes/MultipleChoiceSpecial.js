import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Container,
  Typography,
  CardContent,
  CardHeader,
  Card,
  Grid, 
  CssBaseline
} from "@material-ui/core/";
import { connect } from "react-redux";
import { saveQuestionAction } from "../../actions/question";
import "../../styles/Question.css";
import useStyles from "../../styles/MultipleChoiceSpecial";

const MultipleChoiceSpecial = (props) => {
  const classes = useStyles();

  const getInitialState = () => {
    var initialState = {};
    props.choices.map((choice) => {
      initialState[choice.choice_num] = false;
      return initialState[choice.choice_num];
    });
    return initialState;
  };
  const [options, setOptions] = React.useState({
    ...getInitialState(),
  });

  const [ticked, setTicked] = useState(0);

  const onClick = () => {
    var answer = { answers: [] };
    for (let [key, value] of Object.entries(options)) {
      if (value) {
        answer.answers.push(parseInt(key));
      }
    }
    answer.question_id = props.id;
    props.submitSelectedChoice(answer);
    props.onNext();
    setTicked(0);
    setOptions({ ...getInitialState() });
  };

  const handleChange = (event) => {
    var newState = { ...options };
    if (event.target.checked) setTicked(ticked + 1);
    else setTicked(ticked - 1);
    newState[parseInt(event.target.name)] = event.target.checked;
    setOptions({ ...newState });
  };
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="p"
          align="center"
          variant="h4"
          color="textPrimary"
          gutterBottom
        >
          {props.text}
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12} md={6} style={{ margin: "auto" }}>
            <Card>
              <CardHeader
                title="Select all that apply"
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                action={null}
                className={classes.cardHeader}
              />
              <CardContent>
                <div className={classes.cardPricing}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormGroup>
                      {props.choices.map((choice, index) => {
                        return (
                          <FormControlLabel
                            className="OptionLabel"
                            key={choice.choice_num}
                            control={
                              <Checkbox
                                checked={options[choice.choice_num]}
                                color="primary"
                                onChange={handleChange}
                                key={choice.choice_num}
                                name={choice.choice_num.toString()}
                              />
                            }
                            label={choice.text}
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </div>
              </CardContent>
            </Card>
            <Button
              style={{ marginTop: "20px" }}
              className={classes.nextButton}
              variant="contained"
              disabled={ticked === 0}
              onClick={onClick}
            >
              VOLGENDE
            </Button>
          </Grid>
        </Grid>
      </Container>
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
    submitSelectedChoice: (answer) => {
      dispatch(saveQuestionAction(answer));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleChoiceSpecial);

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormLabel,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core/";
import { connect } from "react-redux";
import { saveQuestionAction } from "../../actions/question";

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(3),
  },
}));

const MultipleChoiceSpecial = (props) => {
  const classes = useStyles();

  const getInitialState = () => {
    var initialState = {};
    props.choices.map((choice) => {
      initialState[choice.choice_num] = false;
      return initialState[choice.choice_num]
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

  console.log(props);
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Choose all that apply</FormLabel>
        <FormGroup>
          {props.choices.map((choice, index) => {
            return (
              <FormControlLabel
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
      <Button
        className={classes.nextButton}
        variant="contained"
        disabled={ticked === 0}
        onClick={onClick}
      >
        NEXT
      </Button>
    </div>
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

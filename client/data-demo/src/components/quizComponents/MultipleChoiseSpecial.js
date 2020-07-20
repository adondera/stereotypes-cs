import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/RadioButtonChecked";
import UncheckedBoxIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useStyles } from "../../styles/MultipleChoiceSpecial";

const MultipleChoiseSpecial = (props) => {
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

  const onClick = () => {
    var answer = { answers: [], question_id: props.id };
    for (let [key, value] of Object.entries(options)) {
      if (value) {
        answer.answers.push(parseInt(key));
      }
    }
    props.registerAnswer(answer);
    props.onNext();
    setOptions({ ...getInitialState() });
  };
  

  // const onClick = () => {
  //   var answer = { answers: [] };
  //   for (let [key, value] of Object.entries(options)) {
  //     if (value) {
  //       answer.answers.push(parseInt(key));
  //     }
  //   }
  //   answer.question_id = props.id;
  //   props.submitSelectedChoice(answer);
  //   props.onNext();
  //   setTicked(0);
  //   setOptions({ ...getInitialState() });
  // };



  const handleChange = (event) => {
    var newState = { ...options };
    newState[parseInt(event.target.name)] = event.target.checked;
    setOptions({ ...newState });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">{props.text}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.grid}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              {props.choices.map((choice, index) => {
                return (
                    <div
                    key={index}
                    style={{                 
                    margin: 'auto',
                    marginTop:'0.5em',
                    marginBottom:'0.5em',
                    width:'100%',
                    textAlign: "center",
                    padding: "0.5em",
                    borderRadius: 8,
                    backgroundColor: options[choice.choice_num] ? "rgba(63,81,181,0.1)" : 'whitesmoke',
                  }}
                >
                  <FormControlLabel
                    style={{width:'100%'}}
                    key={choice.choice_num}
                    control={
                      <Checkbox
                        checkedIcon={
                          <CheckBoxIcon style={{ fontSize: "larger" }} />
                        }
                        icon={
                          <UncheckedBoxIcon style={{ fontSize: "larger" }} />
                        }
                        checked={options[choice.choice_num]}
                        color="primary"
                        onChange={handleChange}
                        key={choice.choice_num}
                        name={choice.choice_num.toString()}
                      />
                    }
                    label={choice.text}
                  />
                </div>
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper} elevation={0}>
            <Link to="/quiz" style={{ textDecoration: "none" }}>
              <Button
                style={{ margin: "auto" }}
                variant="contained"
                color="primary"
                onClick={onClick}
              >
                NEXT
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MultipleChoiseSpecial;

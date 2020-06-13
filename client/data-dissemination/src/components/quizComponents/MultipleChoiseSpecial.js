import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {useStyles} from "../../styles/MultipleChoiceSpecial";

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
        <div className={classes.root}>
            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3">{props.text}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={3}>
                        <FormControl component="fieldset" className={classes.formControl}>
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
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper} elevation={0}>
                        <Link to="/quiz" style={{ textDecoration: "none" }}>
                            // TODO! CHANGE BUTTON ACTION
                            <Button
                                style={{ margin: "auto" }}
                                variant="contained"
                                color="primary"
                                onClick={props.onNext}
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

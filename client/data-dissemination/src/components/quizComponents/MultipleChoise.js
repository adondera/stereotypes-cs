import React from "react";
import {Test, QuestionGroup, Option} from "react-multiple-choice";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

const MultipleChoice = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div>
                <Grid container spacing={3} alignItems="center" justify="center">
                    <Grid item xs={12} sm={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h3">Multiple choice title</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={0}>
                            <Typography style={{textAlign: "justify"}} variant="h6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ultrices tincidunt arcu non sodales neque sodales. Ut diam quam
                                nulla.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center" justify="center">
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={0}>
                            <Test
                                className={classes.choices}
                                onOptionSelect={1}
                            >
                                <QuestionGroup
                                    key={props.questionIndex}
                                    questionNumber={"selected-answer"}
                                >
                                    <Option key={1} value="1">
                                        "hello kitty"
                                    </Option>
                                    <Option key={2} value="2">
                                        "hello kitty"
                                    </Option>
                                    <Option key={2} value="2">
                                        "hello kitty"
                                    </Option>

                                </QuestionGroup>
                            </Test>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Paper className={classes.paper} elevation={0}>
                            <Link to="/quiz" style={{textDecoration: 'none'}}>
                                <Button
                                    style={{margin: "auto"}}
                                    variant="contained"
                                    color="primary">
                                    NEXT
                                </Button>
                            </Link>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default MultipleChoice;

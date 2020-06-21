import React, { useState } from "react";
import { saveQuestionAction } from "../../actions/question";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "../../styles/Question.css";
import useStyles from "../../styles/MultipleChoice";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const MultipleChoice = (props) => {
  const classes = useStyles();
  const [state, setQuestionAnswer] = useState({ answers: [] });
  const onClick = () => {
    props.submitSelectedChoice(state);
    props.onNext();
    setQuestionAnswer({ answers: [] });
  };
  const onSelectedOption = (event) => {
    setQuestionAnswer({
      answers: parseInt(event.target.value),
      question_id: props.id,
    });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="p"
          variant="h4"
          align="center"
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
                title="Select only one answer"
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                action={null}
                className={classes.cardHeader}
              />
              <CardContent className="MultipleChoice">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={state.answers}
                  onChange={onSelectedOption}
                >
                  {props.choices.map((option, index) => {
                    var isSelected = option.choice_num === state.answers;
                    return (
                      <div
                        key={index}
                        style={{
                          textAlign: "center",
                          padding: "0.5em",
                          borderRadius: 8,
                          backgroundColor: isSelected
                            ? "rgba(63,81,181,0.1)"
                            : null,
                        }}
                      >
                        <FormControlLabel
                          className="controlLabel"
                          style={{ width: "100%", margin: "auto" }}
                          value={option.choice_num}
                          control={<Radio color="primary" />}
                          label={option.text}
                        />
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>
            <Button
              style={{ marginTop: "20px" }}
              className={classes.nextButton}
              variant="contained"
              disabled={state.answers.length === 0}
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

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);

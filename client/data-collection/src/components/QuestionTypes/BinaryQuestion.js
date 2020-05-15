import React from "react";
import { connect } from "react-redux";
import { saveQuestionAction } from "../../actions/question";
import answers from "../../utils/constants/Answers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
}));

const BinaryQuestion = (props) => {
  const classes = useStyles();

  const onClickLeft = () => {
    props.onNext();
    props.onLeft(answers.LEFT, props.type);
  };
  const onClickRight = () => {
    props.onNext();
    props.onRight(answers.RIGHT, props.type);
  };
  return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h3>{props.text}</h3>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.root}>
                <CardActionArea onClick={onClickLeft}>
                  <CardMedia
                      component="img"
                      alt=""
                      height="500"
                      image={props.image1}
                      title="image1"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Title here
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.root}>
                <CardActionArea onClick={onClickRight}>
                  <CardMedia
                      component="img"
                      alt=""
                      height="500"
                      image={props.image2}
                      title="image2"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Title here
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </div>
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
    onLeft: (answer, questionType) =>
        dispatch(saveQuestionAction(answer, questionType)),
    onRight: (answer, questionType) =>
        dispatch(saveQuestionAction(answer, questionType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BinaryQuestion);


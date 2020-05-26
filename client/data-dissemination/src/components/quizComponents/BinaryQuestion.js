import React from "react";
// import { connect } from "react-redux";
// import { saveQuestionAction } from "../../actions/question";
// import answers from "../../utils/constants/Answers";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import ImageCard from "./ImageCard";
import TextCard from "./TextCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    margin: 'auto',
    flexGrow: 1,
    marginTop: '200px'
  },
  paper: {
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
}));

const BinaryQuestion = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid className={classes.paper} item xs={4}>
            <Typography variant='h6'>Cat</Typography>
          </Grid>
          <Grid item xs={4}/>
          <Grid className={classes.paper} item xs={4}>
          <Typography variant='h6'>Dog</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextCard
              onClick={() => {console.log('left click')}}
              text= "Stanga"
              isSelected={true}
            />
          </Grid>
          <Grid item xs={4}>
            <ImageCard {...props} image="https://perol.ro/wp-content/uploads/2019/10/caine-1-768x400.jpg"/>
          </Grid>
          <Grid item xs={4}>
            <TextCard
              onClick={() => {console.log('right clikc')}}
              text="Dreapta"
              isSelected={true}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default BinaryQuestion;

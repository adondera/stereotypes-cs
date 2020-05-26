import React from "react";
// import { connect } from "react-redux";
// import { saveQuestionAction } from "../../actions/question";
// import answers from "../../utils/constants/Answers";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ImageCard from "./ImageCard";
import TextCard from "./TextCard";
import { useEffect, useState } from "react";

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

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={0}>
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

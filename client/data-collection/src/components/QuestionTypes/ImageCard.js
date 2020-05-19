import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "60%",
    margin: "auto",
  },
  image: {
    margin: "auto",
    height: "100%",
    width: 270,
    transform: "scale(1.05)",
  },
  imageFocus: {
    transition: "transform .2s",
  },
}));

const ImageCard = (props) => {
  const classes = useStyles();

  return (
    <Slide direction="down" key={props.questionIndex} in={true} mountOnEnter>
      <Card className={classes.root}>
        <CardActionArea onClick={props.onClick}>
          <CardMedia
            className={classes.image}
            component="img"
            alt=""
            image={props.image}
          />
        </CardActionArea>
      </Card>
    </Slide>
  );
};

export default ImageCard;

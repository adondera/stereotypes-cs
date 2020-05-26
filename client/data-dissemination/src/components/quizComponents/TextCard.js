import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "120%"
  },
  image: {
    margin: "auto",
    transform: "scale(1.5)",
  },
  textContent: {
    textAlign: "center",
    height: '100%'
  },
  cardContent: {
    height: '100%'
  }
}))

const TextCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardActionArea
          component="div"
          className={classes.textContent}
        >
          <Card className={classes.cardContent}>

          </Card>
        </CardActionArea>
    </Card>
  );
};

export default TextCard;

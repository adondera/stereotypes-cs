import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderRadius: 15,
  },
  image: {
    margin: "auto",
    transform: "scale(1.5)",
  },
  imageFocus: {
    transition: "transform .2s",
  },
}));

const TextCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={props.onClick}>
        <CardContent
          component="div"
          className={props.isSelected ? classes.imageFocus : classes.image}
        >
          {props.categories.map((category,index) => (
            <Typography variant="h5" key={index}> {category.name} </Typography>

          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TextCard;

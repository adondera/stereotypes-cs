import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
    borderRadius: 15,
    backgroundColor: 'transparent',
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
            <div key={index}>
            {index === 1 ? (
              <Typography variant="h6" style={{lineHeight: 0, marginBottom: '8px', marginTop: '4px'}}> of </Typography>
            ) : (null)}
            <Typography variant="h6" > {category.name} </Typography>
            </div>

          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TextCard;

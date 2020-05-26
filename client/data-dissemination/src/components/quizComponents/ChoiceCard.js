import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import '../../styles/QuizContent.css'
const useStyles = makeStyles((theme) => ({
  cardCorrect: {
    flexGrow: 1,
    height: "120%",
    color: 'green',
  },
  cardIncorrect: {
    flexGrow: 1,
    height: "120%",
    color: 'red'
  },
  textContent: {
    textAlign: "center",
    height: '100%',
  },
  cardContent: {
    height: '100%',
    opacity: '0.3',
  }
}))

const ChoiceCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={props.correct ? classes.cardCorrect : classes.cardIncorrect}>
        <CardActionArea
          component="div"
          onClick={() => props.onClick()}
          className={classes.textContent}
        >
          <Card className={classes.cardContent}>
          </Card>
        </CardActionArea>
    </Card>
  );
};

export default ChoiceCard;

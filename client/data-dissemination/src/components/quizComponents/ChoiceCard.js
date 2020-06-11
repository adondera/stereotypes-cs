import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import React from 'react';
import '../../styles/QuizContent.css';
import { useStyles} from '../../styles/ChoiceCard';

const ChoiceCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={props.correct ? classes.cardCorrect : classes.cardIncorrect}>
        <CardActionArea
          component='div'
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

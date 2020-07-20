import { Card, Grid } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import React from 'react';

import '../../styles/QuizContent.css';
import { useStyles} from '../../styles/ChoiceCard';

const ChoiceCard = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={3} style={{ height: "40px" }}>
    <Card className={classes.card}>
        <CardActionArea
          component='div'
          onClick={() => props.onClick()}
          className={classes.textContent}
        >
          <Card className={classes.cardContent}>
          </Card>
        </CardActionArea>
    </Card>
    </Grid>
  );
};

export default ChoiceCard;

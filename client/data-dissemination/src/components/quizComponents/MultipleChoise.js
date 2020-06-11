import React, {useState} from 'react';
import { Test, QuestionGroup, Option } from 'react-multiple-choice';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import '../../styles/MultipleChoice.css'
import {useStyles} from '../../styles/MultipleChoice';

const MultipleChoice = (props) => {
  const classes = useStyles();
  const [picked, setpicked] = useState(false)

  const onClick = () => {
    const answer = { value: picked, id: props.id };
    props.registerAnswer(answer);
    props.onNext();
  };

  return (
    <div>
      <Grid container spacing={3} alignItems='center' justify='center'>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            <Typography variant='h3'>Multiple choice title</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
            <Typography style={{ textAlign: 'justify' }} variant='h6'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ultrices tincidunt arcu non sodales neque sodales. Ut diam quam
              nulla.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} alignItems='center' justify='center'>
        <Grid className='Test' item xs={12} sm={6} style={{textAlign: 'center'}}>
            <Test style={{width: '70%'}} onOptionSelect={(answers) => setpicked(answers['question'])}>
              <QuestionGroup className='Options'
                key={props.questionIndex}
                questionNumber={'question'}
              >
                {props.options.map((option, key) => (
                <Option key={key} style={{color: '#3F51B5'}}value={key+1}>
                  {option.toString()}
                </Option>
                ))}
              </QuestionGroup>
            </Test>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper} elevation={0}>
            <Link to='/quiz' style={{ textDecoration: 'none' }}>
              <Button
                style={{ margin: 'auto' }}
                variant='contained'
                color='primary'
                onClick={onClick}
                disabled={!picked}
              >
                NEXT
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MultipleChoice;

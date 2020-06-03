import React, { useState } from 'react';
import { saveQuestionAction } from '../../actions/question';
import { connect } from 'react-redux';
import { Test, QuestionGroup, Option } from 'react-multiple-choice';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/Question.css';

import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  choices: {
    margin: 'auto',
  },
}));

const MultipleChoice = (props) => {
  const classes = useStyles();
  const [state, setQuestionAnswer] = useState({ answers: [] });
  const onClick = () => {
    props.submitSelectedChoice(state);
    props.onNext();
    setQuestionAnswer({ answers: [] });
  };
  const onSelectedOption = (selectedOption) => {
    setQuestionAnswer({
      answers: parseInt(selectedOption['selected-answer']),
      question_id: props.id
    });
  };
  console.log(props);

  return (
    // <React.Fragment>
    //   <div className={classes.root}>
    //     <Grid container spacing={3}>
    //       <Grid item xs={12}>
    //         <Slide
    //           direction='down'
    //           in={true}
    //           key={props.questionIndex}
    //           mountOnEnter
    //         >
    //           <Card className={classes.root}>
    //             <Typography gutterBottom variant='h5' component='h2'>
    //               {props.text}
    //             </Typography>
    //             <CardContent>
    //               <Typography
    //                 variant='body2'
    //                 color='textSecondary'
    //                 component='p'
    //               ></Typography>
    // <Test
    //   className={classes.choices}
    //   onOptionSelect={onSelectedOption}
    // >
    //   <QuestionGroup
    //     key={props.questionIndex}
    //     questionNumber={'selected-answer'}
    //   >
    //     {props.choices.map((option, index) => {
    //       return (
    //         <Option key={index} value={(option.choice_num).toString()}>
    //           {option.text}
    //         </Option>
    //       );
    //     })}
    //   </QuestionGroup>
    // </Test>
    //             </CardContent>
    //           </Card>
    //         </Slide>
    //       </Grid>
    //     </Grid>
    // <Button
    //   className={classes.nextButton}
    //   variant='contained'
    //   disabled={state.answers.length === 0}
    //   onClick={onClick}
    // >
    //   NEXT
    // </Button>
    //   </div>
    // </React.Fragment>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm' component='main' className={classes.heroContent}>
        <Typography
          component='h1'
          variant='h2'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          {props.text}
        </Typography>
        {/*<Typography variant='h5' align='center' color='textSecondary' component='p'>*/}
        {/*  Select all that apply.*/}
        {/*</Typography>*/}
      </Container>
      <Container maxWidth='md' component='main'>
        <Grid container spacing={5} alignItems='flex-end'>
          <Grid item xs={12} md={6} style={{ margin: 'auto' }}>
            <Card>
              <CardHeader
                title='Select only one answer'
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                action={null}
                className={classes.cardHeader}
              />
              <CardContent className='MultipleChoice'>
                <Test
                  style={{ width: '90%' }}
                  className={classes.choices}
                  onOptionSelect={onSelectedOption}
                >
                  <QuestionGroup
                    style={{fontSize: 'large'}}
                    key={props.questionIndex}
                    questionNumber={'selected-answer'}
                  >
                    {props.choices.map((option, index) => {
                      return (
                        <Option
                          key={index}
                          value={option.choice_num.toString()}
                        >
                          {option.text}
                        </Option>
                      );
                    })}
                  </QuestionGroup>
                </Test>
              </CardContent>
            </Card>
            <Button
              style={{ marginTop: '20px' }}
              className={classes.nextButton}
              variant='contained'
              disabled={state.answers.length === 0}
              onClick={onClick}
            >
              NEXT
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitSelectedChoice: (answer) => {
      dispatch(saveQuestionAction(answer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);

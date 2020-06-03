import '../../styles/Question.css';
import React, { useState } from 'react';
import Likert from 'react-likert-scale';
import { likertScaleText } from '../../utils/constants/LikertScale';
import { saveQuestionAction } from '../../actions/question';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
}));

const LikertScaleQuestion = (props) => {
  const classes = useStyles();
  const [state, setQuestionAnswer] = useState({ answers: [] });
  const onClick = () => {
    props.submitSelectedScale(state);
    props.onNext();
    setQuestionAnswer({ answers: [] });
  };

  const likertOptions = {
    responses: likertScaleText.map((scaleText, index) => {
      return { value: index + 1, text: scaleText };
    }),
    picked: (val) => {
      setQuestionAnswer({ answers: parseInt(val), question_id: props.id });
    },
  };

  return (
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
      </Container>
      <Container maxWidth='md' component='main'>
        <Grid container spacing={5} alignItems='flex-end'>
          <Grid item xs={12} md={12} style={{ margin: 'auto' }}>
            <Card>
              <CardHeader
                title='Selecteer degene die u het meest geschikt acht'
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                action={null}
                className={classes.cardHeader}
              />
              <CardContent>
                <Likert
                  key={props.questionIndex}
                  {...likertOptions}
                  className='likertScale'
                />
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
    submitSelectedScale: (answer) => {
      dispatch(saveQuestionAction(answer));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikertScaleQuestion);

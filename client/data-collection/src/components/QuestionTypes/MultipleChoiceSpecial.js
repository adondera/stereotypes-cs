import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core/';
import { connect } from 'react-redux';
import { saveQuestionAction } from '../../actions/question';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../../styles/Question.css';

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

const MultipleChoiceSpecial = (props) => {
  const classes = useStyles();

  const getInitialState = () => {
    var initialState = {};
    props.choices.map((choice) => {
      initialState[choice.choice_num] = false;
      return initialState[choice.choice_num];
    });
    return initialState;
  };
  const [options, setOptions] = React.useState({
    ...getInitialState(),
  });

  const [ticked, setTicked] = useState(0);

  const onClick = () => {
    var answer = { answers: [] };
    for (let [key, value] of Object.entries(options)) {
      if (value) {
        answer.answers.push(parseInt(key));
      }
    }
    props.submitSelectedChoice(answer);
    props.onNext();
    setTicked(0);
    setOptions({ ...getInitialState() });
  };

  const handleChange = (event) => {
    var newState = { ...options };
    if (event.target.checked) setTicked(ticked + 1);
    else setTicked(ticked - 1);
    newState[parseInt(event.target.name)] = event.target.checked;
    setOptions({ ...newState });
  };

  console.log(props);
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
          <Grid item xs={12} md={6} style={{ margin: 'auto' }}>
            <Card >
              <CardHeader
                title='Select all that apply'
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                action={null}
                className={classes.cardHeader}
              />
              <CardContent>
                <div className={classes.cardPricing}>
                  <FormControl
                    component='fieldset'
                    className={classes.formControl}
                  >
                    <FormGroup>
                      {props.choices.map((choice, index) => {
                        return (
                          <FormControlLabel
                          className='OptionLabel'
                            key={choice.choice_num}
                            control={
                              <Checkbox
                                checked={options[choice.choice_num]}
                                color='primary'
                                onChange={handleChange}
                                key={choice.choice_num}
                                name={choice.choice_num.toString()}
                              />
                            }
                            label={choice.text}
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </div>
              </CardContent>
            </Card>
            <Button
            style={{marginTop: '20px'}}
              className={classes.nextButton}
              variant='contained'
              disabled={ticked === 0}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleChoiceSpecial);

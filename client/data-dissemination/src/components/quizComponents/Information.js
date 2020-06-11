import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import { useStyles} from '../../styles/Information';

const Information = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} alignItems='center' justify='center'>
                {/*title*/}
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <Typography style={{textAlign: 'justify'}} variant='h6'>
                            {props.text}
                        </Typography>
                    </Paper>
                </Grid>
                {/*button*/}
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper} elevation={0}>
                        <Link to='/quiz' style={{textDecoration: 'none'}}>
                            <Button
                                style={{margin: 'auto'}}
                                variant='contained'
                                color='primary'
                                onClick={props.onNext}>
                                NEXT
                            </Button>
                        </Link>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Information;

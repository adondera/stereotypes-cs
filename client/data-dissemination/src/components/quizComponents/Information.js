import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '95%',
        margin: 'auto',
        flexGrow: 1,
        marginTop: '20px',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));


const Information = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} alignItems='center' justify='center'>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>
                        <Typography variant='h3'>{props.title}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <Typography style={{textAlign: 'justify'}} variant='h6'>
                            {props.body}
                        </Typography>
                    </Paper>
                </Grid>
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

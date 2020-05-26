import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "20px",
        margin: "auto",
        width: "90%",
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.primary,
    },
}));


const Information = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3">Information title</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <Typography style={{textAlign: "justify"}} variant="h6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ultrices tincidunt arcu non sodales neque sodales. Ut diam quam
                            nulla.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper} elevation={0}>
                        <Link to="/quiz" style={{textDecoration: 'none'}}>
                            <Button
                                style={{margin: "auto"}}
                                variant="contained"
                                color="primary">
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

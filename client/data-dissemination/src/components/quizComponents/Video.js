import React from "react";
import YoutubeVideo from "react-youtube";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.primary,
        pointerEvents: "none",
        width: "100%",
    },
    videoHide: {
        display: "none",
    },
    playButton: {
        marginBottom: 10,
    },
    nextButton: {
        marginTop: 20,
    },
}));

const Video = (props) => {
    const classes = useStyles();

    const opts = {
        playerVars: {
            controls: 0,
        },
    };

    return (
        <div>
            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={0}>
                        <YoutubeVideo
                            videoId="U1mlCPMYtPk"
                            onReady={null}
                            opts={opts}
                            onEnd={() => console.log('end of the video')}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.paper}>
                    <Paper>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.playButton}
                        onClick={() => {console.log("TODO!")}}
                    >
                        Play
                    </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default Video;

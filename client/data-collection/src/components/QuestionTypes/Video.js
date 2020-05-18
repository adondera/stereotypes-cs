import React from "react";
import YoutubeVideo from "react-youtube";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Spinner from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    margin: "auto",
  },
  video: {
    marginTop: 10,
    pointerEvents: "none",
    width: "90%",
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
  const videoRef = React.createRef();
  const [state, setstate] = useState({
    isPlayedOnce: false,
    isLoading: true,
    isPlayed: false,
  });
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    //event.target.playVideo();
    setstate({ ...state, isLoading: false });
  };
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      controls: 0,
    },
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.card}>
          <Card>
            <CardContent>
              {state.isPlayed ? null : (
                <Typography gutterBottom variant="h5" component="h2">
                  {props.text}
                </Typography>
              )}
              <YoutubeVideo
                ref={videoRef}
                className={
                  !state.isPlayed || state.isLoading
                    ? classes.videoHide
                    : classes.video
                }
                videoId={props.videoId}
                onReady={onReady}
                opts={opts}
                onEnd={() => setstate({ ...state, isPlayedOnce: true })}
              />
              {state.isLoading ? <Spinner className={classes.nextButton} /> : null}
            </CardContent>
            {state.isPlayed ? null : (
              <React.Fragment>
              {state.isLoading ? (
                null
              ) : (
                <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.playButton}
                onClick={() => {
                  setstate({ ...state, isPlayed: true });
                  videoRef.current.internalPlayer.playVideo();
                }}
              >
                Play
              </Button>
              )}
              </React.Fragment>
            )}
            {state.isPlayedOnce ? (
              <Button
              color="primary"
                variant="contained"
                size="small"
                className={classes.playButton}
                onClick={() => {
                  setstate({ ...state, isPlayed: true });
                  videoRef.current.internalPlayer.playVideo();
                }}
              >
                Replay
              </Button>
            ) : null}
          </Card>
        </Grid>
      </Grid>
      {state.isPlayedOnce ? (
        <Button
          className={classes.nextButton}
          onClick={props.onNext}
          variant="contained"
          disabled={!state.isPlayedOnce}
          hidden={!state.isPlayedOnce}
        >
          Next
        </Button>
      ) : null}
    </div>
  );
};

export default Video;

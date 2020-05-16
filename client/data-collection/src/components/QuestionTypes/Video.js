import React from "react";
import YoutubeVideo from "react-youtube";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Spinner from "@material-ui/core/CircularProgress"

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
    width: "100%",
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
  const [state, setstate] = useState({ isPlayed: false, isLoading: true });
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
              <Typography gutterBottom variant="h5" component="h2">
                {props.text}
              </Typography>
                <YoutubeVideo
                  style={{display: state.isLoading ? "none" : "block"}}
                  ref={videoRef}
                  className={classes.video}
                  videoId={props.videoId}
                  onReady={onReady}
                  opts={opts}
                  onEnd={() => setstate({ ...state, isPlayed: true })}
                />
                {state.isLoading ? (<Spinner/>) : (null)}
            </CardContent>
            <Button
              variant="contained"
              size="medium"
              className={classes.playButton}
              onClick={() => videoRef.current.internalPlayer.playVideo()}
            >
              {state.isPlayed ? <span>Replay</span> : <span>Play</span>}
            </Button>
          </Card>
        </Grid>
      </Grid>
      {state.isPlayed ? (
        <Button
          className={classes.nextButton}
          onClick={props.onNext}
          variant="contained"
          disabled={!state.isPlayed}
          hidden={!state.isPlayed}
        >
          Next
        </Button>
      ) : null}
    </div>
  );
};

export default Video;

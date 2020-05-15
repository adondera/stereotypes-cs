import React from "react";
import YoutubeVideo from "react-youtube";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const onReady = (event) => {
  // access to player in all event handlers via event.target
  //event.target.playVideo();
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    margin: "auto"
  },
  video: {
    marginTop: 20,
    pointerEvents: "none"
  }
  }));

const Video = (props) => {
  const classes = useStyles();
  const videoRef = React.createRef()

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      controls: 0
    },
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} className={classes.card}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.text}
              </Typography>
              <Button
                className={classes.nextButton}
                variant="contained"
                onClick={() => videoRef.current.internalPlayer.playVideo()}
              >
                Play Video
              </Button>
              <YoutubeVideo
                ref={videoRef}
                className={classes.video}
                videoId={props.videoId}
                onReady={onReady}
                opts={opts}
                onEnd={props.onNext}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Video;

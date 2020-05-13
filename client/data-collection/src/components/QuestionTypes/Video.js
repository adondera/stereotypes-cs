import React from "react";
import YoutubeVideo from "react-youtube";
const onReady = (event) => {
  // access to player in all event handlers via event.target
  event.target.playVideo();
};
const Video = (props) => {
  return (
      <div  style = {{"pointer-events": "none"}}>
        <YoutubeVideo
          videoId={props.videoId}
          onReady={onReady}
          onEnd={props.onNext}
        />
      </div>
  );
};

export default Video;

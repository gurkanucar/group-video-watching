import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";

const VideoComponent = (props) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const { url } = props;
  const [playerState, setPlayerState] = useState();

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    setPlayer(event.target);
    event.target.pauseVideo();
  };

  const onStateChange = (e) => {
    setPlayerState(e);
    console.log("onStateChange", e);
    console.log("videoTitle", e.target.videoTitle);
    console.log("playerInf", e.target.playerInfo);
  };

  const onPlaybackRateChange = (event) => {
    //console.log("onPlaybackRateChange", event);
  };

  return (
    <div>
      <h3>{`currentTime: ${playerState?.target?.playerInfo.currentTime}`}</h3>
      <h3>{`playbackRate: ${playerState?.target?.playerInfo.playbackRate}`}</h3>
      <h3>{`videoUrl: ${playerState?.target?.playerInfo.videoUrl}`}</h3>
      <h3>{`volume: ${playerState?.target?.playerInfo.volume}`}</h3>
      <h3>{`playerState: ${playerState?.target?.playerInfo.playerState}`}</h3>
      <Youtube
        videoId={youtube_parser(url)}
        opts={opts}
        onStateChange={onStateChange}
        onPlaybackRateChange={onPlaybackRateChange}
        onReady={onReady}
      />
    </div>
  );
};

export default VideoComponent;

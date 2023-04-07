import { parseUrl } from "@/util/videoUtils";
import React from "react";
import YouTube from "react-youtube";

const VideoComponent = (props) => {
  const {
    videoUrl,
    player,
    setPlayer,
    onPlayerStateChange,
    onPlaybackRateChange,
    onVideoIdChange,
  } = props;

  const onPlayerReady = (event) => {
    const player = event.target;
    player.pauseVideo();
    setPlayer(player);
    onVideoIdChange(parseUrl(videoUrl));
  };

  const options = {
    height: "500",
    width: "700",
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
      showInfo: 0,
    },
  };

  return (
    <div>
      <YouTube
        videoId={parseUrl(videoUrl)}
        opts={options}
        onReady={onPlayerReady}
        onPlaybackRateChange={onPlaybackRateChange}
        onStateChange={onPlayerStateChange}
      />
    </div>
  );
};

export default VideoComponent;

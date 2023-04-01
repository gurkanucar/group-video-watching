import { usePlayer } from "@/hooks/usePlayer";
import { parseUrl } from "@/util/videoUtils";
import React, { useEffect, useRef, useState } from "react";
import Youtube from "react-youtube";

const VideoComponent = (props) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const { url, playerRef, onStateChange, onPlaybackRateChange, onReady,playerInfo } =
    props;

  return (
    <div>
      <h3>{`currentTime: ${playerInfo.currentTime}`}</h3>
      <h3>{`playbackRate: ${playerInfo.playbackRate}`}</h3>
      <h3>{`videoUrl: ${playerInfo.videoUrl}`}</h3>
      <h3>{`volume: ${playerInfo.volume}`}</h3>
      <h3>{`playerState: ${playerInfo.playerState}`}</h3>
      <Youtube
        ref={playerRef}
        videoId={parseUrl(url)}
        opts={opts}
        onStateChange={onStateChange}
        onPlaybackRateChange={onPlaybackRateChange}
        onReady={onReady}
      />
    </div>
  );
};

export default VideoComponent;

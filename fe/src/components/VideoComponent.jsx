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

  const { url } = props;

  const onSoundLevelChange = (newVolume) => {
    console.log(`Volume changed: ${newVolume}`);
  };

  const { playerRef, seekTo, setVolume, onStateChange, playerInfo } =
    usePlayer(onSoundLevelChange);

  const [playerState, setPlayerState] = useState();

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const onPlaybackRateChange = () => {};

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
      <button
        onClick={() => {
          seekTo(1415.182735);
          setVolume(25);
        }}
      >
        update
      </button>
    </div>
  );
};

export default VideoComponent;

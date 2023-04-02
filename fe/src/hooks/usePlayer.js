import { useRef, useState, useEffect } from "react";

export const usePlayer = (onPlayerStateChange) => {
  const playerRef = useRef();
  const [playerInfo, setPlayerInfo] = useState({});

  const seekTo = (time) => {
    playerRef.current.internalPlayer.seekTo(time);
  };

  const play = () => {
    console.log("REF", playerRef);
    playerRef.current.internalPlayer.playVideo();
  };

  const pause = () => {
    playerRef.current.internalPlayer.pauseVideo();
  };

  const onStateChange = (event) => {
    const updatedPlayerInfo = { ...event.target.playerInfo };
    setPlayerInfo(updatedPlayerInfo);
    onPlayerStateChange?.(updatedPlayerInfo);
  };

  return {
    playerRef,
    seekTo,
    play,
    pause,
    onStateChange,
    playerInfo,
  };
};

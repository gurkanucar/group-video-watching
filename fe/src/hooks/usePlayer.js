import { useRef, useState, useEffect } from "react";

export const usePlayer = (onSoundLevelChange) => {
  const player = useRef();
  const [playerInfo, setPlayerInfo] = useState({});
  const [volume, setVolumeState] = useState();

  const seekTo = (time) => {
    player.current.internalPlayer.seekTo(time);
  };

  const setVolume = (volume) => {
    player.current.internalPlayer.setVolume(volume);
  };

  const onStateChange = (e) => {
    setPlayerInfo(e.target.playerInfo);
    console.log("onStateChange", e);
    console.log("videoTitle", e.target.videoTitle);
    console.log("playerInf", e.target.playerInfo);
  };

  useEffect(() => {
    const checkVolumeInterval = setInterval(() => {
      const currentVolume = playerInfo.volume;
      if (currentVolume !== undefined && currentVolume !== volume) {
        onSoundLevelChange?.(currentVolume);
        setVolumeState(currentVolume);
      }
    }, 1000);

    return () => {
      clearInterval(checkVolumeInterval);
    };
  }, [volume, onSoundLevelChange]);

  return {
    playerRef: player,
    seekTo,
    setVolume,
    onStateChange,
    playerInfo,
  };
};

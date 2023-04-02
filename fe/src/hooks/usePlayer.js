import { useRef, useState, useEffect } from "react";

export const usePlayer = (
  onPlayerStateChange,
  onSoundLevelChange,
  onPlaybackRateChange
) => {
  const playerRef = useRef();
  const [playerInfo, setPlayerInfo] = useState({});
  const [volume, setVolumeState] = useState();
  const seekTo = (time) => {
    playerRef.current.internalPlayer.seekTo(time);
  };

  const setVolume = (volume) => {
    playerRef.current.internalPlayer.setVolume(volume);
  };

  const onStateChange = (event) => {
    const updatedPlayerInfo = event.target.playerInfo;
    setPlayerInfo(updatedPlayerInfo);
    onPlayerStateChange?.(updatedPlayerInfo);
  };

  const handlePlaybackRateChange = (event) => {
    const currentPlaybackRate = event.target.getPlaybackRate();
    onPlaybackRateChange?.(currentPlaybackRate);
  };

  useEffect(() => {
    const checkVolumeInterval = setInterval(() => {
      const currentVolume = playerInfo.volume;
      if (currentVolume !== undefined && currentVolume !== volume) {
        onSoundLevelChange?.(currentVolume);
        setVolumeState(currentVolume);
      }
    }, 200);

    return () => {
      clearInterval(checkVolumeInterval);
    };
  }, [volume, onSoundLevelChange]);

  return {
    playerRef,
    seekTo,
    setVolume,
    onStateChange,
    handlePlaybackRateChange,
    playerInfo,
  };
};

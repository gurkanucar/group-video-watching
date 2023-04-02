import { useRef, useState, useEffect } from "react";

export const usePlayer = (
  onPlayerStateChange,
  onSoundLevelChange,
  onPlaybackRateChange
) => {
  const playerRef = useRef();
  const [playerInfo, setPlayerInfo] = useState({});
  const [volume, setVolumeState] = useState();
  const [isSocketUpdate, setIsSocketUpdate] = useState(false);

  const seekTo = (time) => {
    playerRef.current.internalPlayer.seekTo(time);
  };

  const setVolume = (volume, fromSocket = false) => {
    setIsSocketUpdate(fromSocket);
    playerRef.current.internalPlayer.setVolume(volume);
  };

  const play = () => {
    console.log("REF", playerRef);
    playerRef.current.internalPlayer.playVideo();
  };

  const pause = () => {
    playerRef.current.internalPlayer.pauseVideo();
  };

  const onStateChange = (event) => {
    const updatedPlayerInfo = event.target.playerInfo;
    setPlayerInfo(updatedPlayerInfo);
    if (!isSocketUpdate) {
      onPlayerStateChange?.(updatedPlayerInfo);
    }
  };

  const handlePlaybackRateChange = (event) => {
    const currentPlaybackRate = event.target.getPlaybackRate();
    if (!isSocketUpdate) {
      onPlaybackRateChange?.(currentPlaybackRate);
    }
  };

  useEffect(() => {
    const checkVolumeInterval = setInterval(() => {
      const currentVolume = playerInfo.volume;
      if (currentVolume !== undefined && currentVolume !== volume) {
        setVolumeState(currentVolume);
        if (!isSocketUpdate) {
          onSoundLevelChange?.(currentVolume);
        }
        setIsSocketUpdate(false);
      }
    }, 700);

    return () => {
      clearInterval(checkVolumeInterval);
    };
  }, [playerInfo.volume, volume, onSoundLevelChange]);

  return {
    playerRef,
    seekTo,
    setVolume,
    play,
    pause,
    onStateChange,
    handlePlaybackRateChange,
    playerInfo,
  };
};

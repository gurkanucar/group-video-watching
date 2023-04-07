import { useEffect, useState } from "react";

const usePlayer = (socket, on, emit, handleLocalVideoIdChange) => {
  const [player, setPlayer] = useState(null);
  const [lastEmittedTime, setLastEmittedTime] = useState(0);
  const [isExternalChange, setIsExternalChange] = useState(false);

  const onPlayerStateChange = (event) => {
    if (isExternalChange) {
      setIsExternalChange(false);
      return;
    }
    const player = event.target;
    console.log("myplayer", player);
    const playerState = player.getPlayerState();

    if (playerState === 1) {
      const currentTime = player.getCurrentTime();
      if (Math.abs(currentTime - lastEmittedTime) >= 1) {
        setLastEmittedTime(currentTime);
        emit("seekChange", { currentTime });
      }
      emit("playerStateChange", { playerState: "play" });
    } else if (playerState === 2) {
      emit("playerStateChange", { playerState: "pause" });
    }
  };

  const onPlaybackRateChange = (event) => {
    if (isExternalChange) {
      setIsExternalChange(false);
      return;
    }
    const player = event.target;
    console.log("playbackRate", player.getPlaybackRate());
    const playbackRate = player.getPlaybackRate();
    emit("onPlaybackRateChange", { playbackRate: playbackRate });
  };

  const onVideoIdChange = (videoId) => {
    if (player) {
      setIsExternalChange(true);
      player.loadVideoById(videoId);
      handleLocalVideoIdChange(videoId);
      setTimeout(() => {
        setIsExternalChange(false);
      }, 200);
    }
  };
  const emitVideoIdChange = (videoId) => {
    emit("videoIdChange", { videoId });
  };
  useEffect(() => {
    if (socket) {
      on("handleSeekChange", (data) => {
        const parsedData = JSON.parse(data);
        if (player && player.getIframe()) {
          player.seekTo(parsedData.seekTo, true);
        }
      });
      on("handlePlaybackRateChange", (data) => {
        const parsedData = JSON.parse(data);
        console.log("handlePlaybackRateChange", parsedData.playbackRate);
        if (player && player.getIframe()) {
          player.setPlaybackRate(parsedData.playbackRate);
        }
      });
      on("handlePlayerStateChange", (data) => {
        const parsedData = JSON.parse(data);
        if (player && player.getIframe()) {
          setIsExternalChange(true);
          if (parsedData.playerState === "play") {
            player.playVideo();
          } else if (parsedData.playerState === "pause") {
            player.pauseVideo();
          }
          setTimeout(() => {
            setIsExternalChange(false);
          }, 200);
        }
      });
      on("handleVideoIdChange", (data) => {
        const parsedData = JSON.parse(data);
        if (player && player.getIframe()) {
          onVideoIdChange(parsedData.videoId);
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("seekChange");
        socket.off("handlePlayerStateChange");
      }
    };
  }, [socket, player, on]);

  return {
    player,
    setPlayer,
    lastEmittedTime,
    setLastEmittedTime,
    onPlayerStateChange,
    onPlaybackRateChange,
    onVideoIdChange,
    emitVideoIdChange,
  };
};

export default usePlayer;

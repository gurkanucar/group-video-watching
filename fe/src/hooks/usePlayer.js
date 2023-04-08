import { useEffect, useState } from "react";

const usePlayer = (socket, on, emit, handleLocalVideoIdChange) => {
  const [player, setPlayer] = useState(null);
  const [isExternalChange, setIsExternalChange] = useState(false);

  const handlePlayerChange = (event, eventType) => {
    if (isExternalChange) {
      setIsExternalChange(false);
      return;
    }
    const player = event.target;

    const playerState = player.getPlayerState();
    const currentTime = player.getCurrentTime();
    const playbackRate = player.getPlaybackRate();
    const videoData = player.getVideoData();
    console.log(player.getVideoData());
    const videoId = videoData?.video_id;
    if (!videoId) {
      return;
    }

    emit("playerChange", {
      eventType: eventType,
      playerState: playerState,
      currentTime: currentTime,
      playbackRate: playbackRate,
      videoId: videoId,
    });
  };

  const onPlayerStateChange = (event) => {
    // If the player state is unstarted (-1), do not emit the event.
    if (event.data === -1) {
      return;
    }
    handlePlayerChange(event, "stateChange");
  };

  const onPlaybackRateChange = (event) => {
    handlePlayerChange(event, "playbackRateChange");
  };

  const onVideoIdChange = (videoId) => {
    if (player) {
      setIsExternalChange(true);
      player.loadVideoById(videoId);
      handleLocalVideoIdChange(videoId);
      handlePlayerChange({ target: player }, "videoIdChange");
      setTimeout(() => {
        setIsExternalChange(false);
      }, 200);
    }
  };

  const emitVideoIdChange = (videoId) => {
    if (player) {
      handlePlayerChange({ target: player }, "videoIdChange");
    }
  };
  useEffect(() => {
    if (socket) {
      on("handlePlayerChange", (data) => {
        const parsedData = JSON.parse(data);
        if (player && player.getIframe()) {
          setIsExternalChange(true);

          if (
            parsedData.eventType === "stateChange" &&
            Math.abs(player.getCurrentTime() - parsedData.currentTime) >= 1
          ) {
            console.log("seek update");
            player.seekTo(parsedData.currentTime, true);
          }
          // Handle playback rate change
          if (parsedData.eventType === "playbackRateChange") {
            console.log("playbackRate update");
            player.setPlaybackRate(parsedData.playbackRate);
          }
          // Handle player state change
          if (parsedData.eventType === "stateChange") {
            console.log("playerState update");
            if (parsedData.playerState === 1) {
              player.playVideo();
            } else if (parsedData.playerState === 2) {
              player.pauseVideo();
            }
          }
          // Handle video ID change
          const videoData = player.getVideoData();
          if (videoData && parsedData.videoId !== videoData.video_id) {
            console.log("videoId update");
            onVideoIdChange(parsedData.videoId);
          }

          setTimeout(() => {
            setIsExternalChange(false);
          }, 200);
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("handlePlayerChange");
      }
    };
  }, [socket, player, on]);

  return {
    player,
    setPlayer,
    onPlayerStateChange,
    onPlaybackRateChange,
    onVideoIdChange,
    emitVideoIdChange,
  };
};

export default usePlayer;

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
  const syncPlayer = (parsedData) => {
    setIsExternalChange(true);

    // Sync video ID
    const videoData = player.getVideoData();
    if (videoData && parsedData.videoId !== videoData.video_id) {
      onVideoIdChange(parsedData.videoId);
    }

    // Sync player state
    if (parsedData.playerState === 1) {
      player.playVideo();
    } else if (parsedData.playerState === 2) {
      player.pauseVideo();
    }

    // Sync current time
    if (Math.abs(player.getCurrentTime() - parsedData.currentTime) >= 1) {
      player.seekTo(parsedData.currentTime, true);
    }

    // Sync playback rate
    player.setPlaybackRate(parsedData.playbackRate);

    setTimeout(() => {
      setIsExternalChange(false);
    }, 200);
  };

  useEffect(() => {
    if (socket) {
      on("handlePlayerChange", (data) => {
        const parsedData = JSON.parse(data);
        if (player && player.getIframe()) {
          syncPlayer(parsedData);
        }
      });

      on("handleSync", (data) => {
        const parsedData = JSON.parse(data);
        if (player && player.getIframe()) {
          syncPlayer(parsedData);
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("handlePlayerChange");
        socket.off("handleSync");
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

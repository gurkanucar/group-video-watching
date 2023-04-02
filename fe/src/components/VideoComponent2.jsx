import React, { useState } from "react";
import YouTube from "react-youtube";
import useSocket from "@/hooks/useSocket";
import usePlayer from "@/hooks/usePlayer";

const VideoComponent3 = () => {
  const [videoIdValue, setVideoIdValue] = useState("r4Pq5lygij8");
  const { socket, on, emit } = useSocket("http://localhost:8000");
  const { player, setPlayer, lastEmittedTime, setLastEmittedTime } = usePlayer(socket, on, emit);

  const onPlayerReady = (event) => {
    const player = event.target;
    player.pauseVideo();
    setPlayer(player);
  };

  const onPlayerStateChange = (event) => {
    const player = event.target;
    const playerState = player.getPlayerState();

    if (playerState === 1) {
      // Playing
      const currentTime = player.getCurrentTime();
      if (Math.abs(currentTime - lastEmittedTime) >= 1) {
        setLastEmittedTime(currentTime);
        emit("seekChange", { currentTime });
      }
      emit("playerStateChange", { playerState: "play" });
    } else if (playerState === 2) {
      // Paused
      emit("playerStateChange", { playerState: "pause" });
    }
  };

  const handleVideoIdChange = (e) => {
    setVideoIdValue(e.target.value);
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
        videoId={videoIdValue}
        opts={options}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
      />
      <input
        id="videoId"
        type="text"
        value={videoIdValue}
        onChange={handleVideoIdChange}
      />
    </div>
  );
};

export default VideoComponent3;

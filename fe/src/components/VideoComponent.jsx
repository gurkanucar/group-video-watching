import React, { useState } from "react";
import YouTube from "react-youtube";
import useSocket from "@/hooks/useSocket";
import usePlayer from "@/hooks/usePlayer";

const VideoComponent = () => {
  const [videoIdValue, setVideoIdValue] = useState("r4Pq5lygij8");
  const { socket, on, emit } = useSocket("http://192.168.0.28:8000");
  const { player, setPlayer, onPlayerStateChange } = usePlayer(
    socket,
    on,
    emit
  );

  const onPlayerReady = (event) => {
    const player = event.target;
    player.pauseVideo();
    setPlayer(player);
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

export default VideoComponent;

import useSocket from "@/hooks/useSocket";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const VideoComponent3 = () => {
  const [player, setPlayer] = useState(null);
  const [videoIdValue, setVideoIdValue] = useState("r4Pq5lygij8");
  const [isSeekFromSocket, setIsSeekFromSocket] = useState(false);

  const { socket, on, emit } = useSocket("http://localhost:8000"); // Replace "your-websocket-url" with your WebSocket URL

  useEffect(() => {
    if (socket) {
      on("handlePlayerStateChange", (data) => {
        const parsedData = JSON.parse(data);
        console.log("handlePlayerStateChange", parsedData);
        setIsSeekFromSocket(true);
        if (player && player.getIframe()) {
          player.seekTo(parsedData.seekTo, true);
        }
        setIsSeekFromSocket(false);
      });
    }
    return () => {
      if (socket) {
        socket.off("playerStateChange");
      }
    };
  }, [socket, player, on]);

  const onPlayerReady = (event) => {
    const player = event.target;
    player.pauseVideo();
    setPlayer(player);
  };

  const onPlayerStateChange = (event) => {
    const player = event.target;
    if (player.getPlayerState() === 1 && !isSeekFromSocket) {
      // 1 = Playing
      emit("playerStateChange", {
        playerState: "",
        currentTime: player.getCurrentTime(),
      });
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

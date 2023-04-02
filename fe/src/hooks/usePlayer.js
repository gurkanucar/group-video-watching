import { useState, useEffect } from "react";

const usePlayer = (socket, on, emit) => {
  const [player, setPlayer] = useState(null);
  const [lastEmittedTime, setLastEmittedTime] = useState(0);

  useEffect(() => {
    if (socket) {
      on("handleSeekChange", (data) => {
        const parsedData = JSON.parse(data);
        if (player && player.getIframe()) {
          player.seekTo(parsedData.seekTo, true);
        }
      });

      on("handlePlayerStateChange", (data) => {
        const parsedData = JSON.parse(data);
        if (player && player.getIframe()) {
          if (parsedData.playerState === "play") {
            player.playVideo();
          } else if (parsedData.playerState === "pause") {
            player.pauseVideo();
          }
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

  return { player, setPlayer, lastEmittedTime, setLastEmittedTime };
};

export default usePlayer;

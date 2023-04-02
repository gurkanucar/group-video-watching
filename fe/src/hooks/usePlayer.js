import { useState, useEffect, useRef } from "react";

const usePlayer = (socket, on, emit) => {
  const [player, setPlayer] = useState(null);
  const [lastEmittedTime, setLastEmittedTime] = useState(0);
  const clientIdRef = useRef(null);

  const onPlayerStateChange = (event) => {
    const player = event.target;
    const playerState = player.getPlayerState();

    if (playerState === 1) {
      const currentTime = player.getCurrentTime();
      if (Math.abs(currentTime - lastEmittedTime) >= 1) {
        setLastEmittedTime(currentTime);
        emit("seekChange", { currentTime });
      }
      emit("playerStateChange", {
        playerState: "play",
        clientId: clientIdRef.current,
      });
    } else if (playerState === 2) {
      emit("playerStateChange", {
        playerState: "pause",
        clientId: clientIdRef.current,
      });
    }
  };

  useEffect(() => {
    if (socket) {
      clientIdRef.current = socket.id;
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

  return {
    player,
    setPlayer,
    lastEmittedTime,
    setLastEmittedTime,
    onPlayerStateChange,
  };
};

export default usePlayer;

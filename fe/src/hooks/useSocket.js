// useSocket.js
import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  const on = useCallback(
    (event, callback) => {
      if (socket) {
        socket.on(event, callback);
      }
    },
    [socket]
  );

  const emit = useCallback(
    (event, data) => {
      if (socket) {
        socket.emit(event, data);
      }
    },
    [socket]
  );

  return { socket, on, emit };
};

export default useSocket;

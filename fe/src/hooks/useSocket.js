// useSocket.js
import { useEffect, useState, useRef, useCallback } from "react";
import io from "socket.io-client";

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(url);
    setSocket(socketRef.current);

    return () => {
      socketRef.current.disconnect();
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

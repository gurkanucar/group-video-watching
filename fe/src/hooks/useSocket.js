import { useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";

const useSocket = (url, username, room) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(url);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("joinRoom", { username, room });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const on = useCallback((eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off(eventName, callback);
      }
    };
  }, []);

  const emit = useCallback((eventName, data) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, data);
    }
  }, []);

  return { socket: socketRef.current, on, emit };
};

export default useSocket;

import { useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";

const useSocket = (url, room) => {
  const socketRef = useRef(null);

  const joinRoom = () => {
    if (socketRef.current && room) {
      socketRef.current.emit("joinRoom", { room });
    }
  };

  const leaveRoom = () => {
    if (socketRef.current && room) {
      socketRef.current.emit("leaveRoom", { room });
    }
  };

  useEffect(() => {
    socketRef.current = io(url);

    return () => {
      leaveRoom();
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

  return { socket: socketRef.current, on, emit, joinRoom, leaveRoom };
};

export default useSocket;

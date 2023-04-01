import { useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";

const useSocket = (url) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(url);

    return () => {
      socketRef.current.disconnect();
    };
  }, []); // Add an empty array here

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

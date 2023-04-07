import usePlayer from "@/hooks/usePlayer";
import useSocket from "@/hooks/useSocket";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import VideoComponent from "./VideoComponent";

export default function Home({ username, room }) {
  const inputRef = useRef();
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=r4Pq5lygij8"
  );

  const { socket, on, emit, joinRoom, leaveRoom } = useSocket(
    `${process.env.BACKEND_URL}:${process.env.SOCKET_PORT}`,
   //  "http://localhost:8000",
    username,
    room
  );

  useEffect(() => {
    if (room && username) {
      leaveRoom();
      joinRoom();
    }
  }, [room, username]);

  const handleLocalVideoIdChange = (videoId) => {
    setVideoUrl(`https://www.youtube.com/watch?v=${videoId}`);
  };
  const {
    player,
    setPlayer,
    onPlayerStateChange,
    onPlaybackRateChange,
    onVideoIdChange,
    emitVideoIdChange,
  } = usePlayer(socket, on, emit, handleLocalVideoIdChange);

  const handleLoadVideo = () => {
    const newVideoUrl = inputRef.current.value;
    setVideoUrl(newVideoUrl);
    const videoId = parseUrl(newVideoUrl);
    emitVideoIdChange(videoId);
    onVideoIdChange(videoId);
  };

  return (
    <>
      <main className={styles.main}>
        <VideoComponent
          videoUrl={videoUrl}
          player={player}
          setPlayer={setPlayer}
          onPlayerStateChange={onPlayerStateChange}
          onPlaybackRateChange={onPlaybackRateChange}
          onVideoIdChange={onVideoIdChange}
        />
        <div className={styles.urlInputContainer}>
          <input ref={inputRef} className={styles.urlInput} />
          <button onClick={handleLoadVideo} className={styles.loadButton}>
            Load Video
          </button>
        </div>
      </main>
    </>
  );
}

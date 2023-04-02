import styles from "@/styles/Home.module.css";
import useSocket from "@/hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import VideoComponent from "@/components/VideoComponent";
import { usePlayer } from "@/hooks/usePlayer";
import VideoComponent2 from "@/components/VideoComponent2";
export default function Home() {
  const { socket, on, emit } = useSocket("http://localhost:8000");

  const inputRef = useRef();
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=r4Pq5lygij8"
  );

  const onPlayerStateChange = (data) => {
    emit("playerStateChange", {
      playerState: data.playerState,
      currentTime: data.currentTime,
    });
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const { playerRef, seekTo, onStateChange, play, pause, playerInfo } =
    usePlayer(onPlayerStateChange);

  useEffect(() => {
    on("handlePlayerStateChange", (data) => {
      const parsedData = JSON.parse(data);
      if (parsedData.playerState == "1") {
        play();
      } else if (parsedData.playerState == "2") {
        pause();
      }
      seekTo(parsedData.seekTo);
    });
  }, [on]);

  return (
    <>
      <main className={styles.main}>
        {/* <VideoComponent
          onStateChange={onStateChange}
          onReady={onReady}
          playerRef={playerRef}
          playerInfo={playerInfo}
          url={videoUrl}
        /> */}

        <VideoComponent2 />
        <input ref={inputRef} />
        <button onClick={() => setVideoUrl(inputRef.current.value)}>
          Load Video
        </button>
      </main>
    </>
  );
}

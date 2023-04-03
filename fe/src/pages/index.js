import styles from "@/styles/Home.module.css";
import useSocket from "@/hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import VideoComponent from "@/components/VideoComponent";
import { usePlayer } from "@/hooks/usePlayer";
export default function Home() {
  //const { socket, on, emit } = useSocket("http://localhost:8000");

  const inputRef = useRef();
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=r4Pq5lygij8"
  );

  return (
    <>
      <main className={styles.main}>
        <VideoComponent />
        <input ref={inputRef} />
        <button onClick={() => setVideoUrl(inputRef.current.value)}>
          Load Video
        </button>
      </main>
    </>
  );
}

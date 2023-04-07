// components/Landing.js
import React, { useRef } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Landing.module.css";

const Landing = () => {
  const usernameRef = useRef();
  const roomNameRef = useRef();
  const router = useRouter();

  const handleJoin = () => {
    const username = usernameRef.current.value;
    const roomName = roomNameRef.current.value;

    if (username && roomName) {
      router.push(`/room?username=${username}&room=${roomName}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Join a Room</h1>
      <input
        ref={usernameRef}
        type="text"
        placeholder="Username"
        className={styles.input}
      />
      <input
        ref={roomNameRef}
        type="text"
        placeholder="Room Name"
        className={styles.input}
      />
      <button onClick={handleJoin} className={styles.joinButton}>
        Join
      </button>
    </div>
  );
};

export default Landing;

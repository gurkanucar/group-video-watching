import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const VideoComponent2 = () => {
  const [player, setPlayer] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [videoIdValue, setVideoIdValue] = useState("r4Pq5lygij8");

  const onPlayerReady = (event) => {
    const player = event.target;
    player.pauseVideo();
    setPlayer(player);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (player) {
        const fraction = (player.getCurrentTime() / player.getDuration()) * 100;
        setSliderValue(fraction);
      }
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [player]);

  const handlePlayClick = () => {
    if (player) {
      const newId = videoIdValue.trim();
      const oldId = player.getVideoData()["video_id"];
      if (newId && newId !== oldId) {
        player.loadVideoById(newId);
      }
      player.playVideo();
    }
  };

  const handlePauseClick = () => {
    if (player) {
      player.pauseVideo();
    }
  };

  const handleSliderChange = (e) => {
    if (player) {
      const goTo = player.getDuration() * (e.target.value / 100);
      player.seekTo(goTo, true);
      const newSliderValue = (goTo / player.getDuration()) * 100;
      setSliderValue(newSliderValue);
    }
  };

  const handleVideoIdChange = (e) => {
    setVideoIdValue(e.target.value);
  };

  const options = {
    height: "500",
    width: "700",
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
      controls: 1,
      disablekb: 1,
      showInfo: 0,
    },
  };

  return (
    <div>
      <YouTube videoId={videoIdValue} opts={options} onReady={onPlayerReady} />
      <input
        id="videoId"
        type="text"
        value={videoIdValue}
        onChange={handleVideoIdChange}
      />
      <button onClick={handlePlayClick}>Play</button>
      <button onClick={handlePauseClick}>Pause</button>
      <input
        id="slider"
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default VideoComponent2;

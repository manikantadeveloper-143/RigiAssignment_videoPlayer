import React, { useRef, useState, useEffect } from "react";

const VideoPlayer = ({ src, ...props }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handlePlayPause = () => {
      setIsPlaying(video.paused);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("play", handlePlayPause);
    video.addEventListener("pause", handlePlayPause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("play", handlePlayPause);
      video.removeEventListener("pause", handlePlayPause);
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    const video = videoRef.current;
    const seekTime = event.target.value;
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleSpeedChange = (event) => {
    const speed = parseFloat(event.target.value);
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  const handleVolumeChange = (event) => {
    const volumeValue = parseFloat(event.target.value);
    setVolume(volumeValue);
    videoRef.current.volume = volumeValue;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="video-play relative">
        <video
          {...props}
          ref={videoRef}
          src={src}
          autoPlay
          onClick={handlePlayPause}
          className="w-full h-auto"
        />
      </div>
      <div className="flex flex-col md:flex-row p-1">
        <div className="flex flex-row w-full md:w-3/4 text-center justify-center items-center">
          <div className="mr-2">
            <button onClick={handlePlayPause} className="cursor-pointer p-1">
              {isPlaying ? (
                <img
                  src="/play.svg"
                  className="h-5 md:h-4 w-5 md:w-5"
                  alt="Play"
                />
              ) : (
                <img
                  src="/pause.svg"
                  className="h-5 md:h-4 w-5 md:w-5"
                  alt="Pause"
                />
              )}
            </button>
          </div>
          <div className="flex-grow mx-2">
            <input
              className="w-full cursor-pointer"
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
            />
          </div>
          <div className="flex items-center mx-2">
            <span className="text-sm md:text-md">
              {formatTime(currentTime)}
            </span>{" "}
            / <span className="text-sm md:text-md">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex flex-row w-full md:w-1/4">
          <div className="flex items-center w-full md:w-auto text-center justify-center">
            <label className="mx-2 text-sm md:text-md">Volume:</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
              className="p-1 border border-gray-300 rounded w-full md:w-18"
            />
          </div>

          <div className="flex items-center w-full md:w-auto ml-2 md:ml-0 mt-2 md:mt-0">
            <label className="mx-2 text-sm md:text-md">Speed:</label>
            <select
              value={playbackSpeed}
              onChange={handleSpeedChange}
              className="p-1 rounded w-full md:w-auto outline-none"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

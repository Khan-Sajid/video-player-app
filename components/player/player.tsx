"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./player.module.scss";
import { PlayerType } from "./player.types";
import { formateTime } from "@/utils/date";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const Player = (props: PlayerType) => {
  const {
    videoURL,
    poster,
    className,
    id,
    playsInline = true,
    controls = false,
    playbackRate = 1,
    videoType = "video/mp4",
    autoPlay = true,
  } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(playbackRate);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [fullscreen, setFullScreen] = useState(false);

  function handleSeek(event: ChangeEvent<HTMLInputElement>) {
    const newTime = +event.target.value;
    if (videoRef.current?.currentTime) videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function toggleFullscreen() {
    setFullScreen(!fullscreen);
  }

  function handleTimeUpdate() {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  }

  function togglePlay() {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    } else if (videoRef.current && videoRef.current.played) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const value = +e.target.value;
    if (videoRef.current) {
      videoRef.current.playbackRate = value;
    }
    setPlaybackSpeed(value);
  }

  if (!videoURL) {
    return null;
  }
  return (
    <div
      key={videoURL}
      className={`${styles.container} ${fullscreen ? styles.fullScreen : ""}`}
    >
      <div
        className={styles.overlay}
        onMouseEnter={() => {
          setShowControls(true);
        }}
        onMouseLeave={() => {
          setShowControls(false);
        }}
        onClick={togglePlay}
      >
        {showControls && (
          <div
            className={styles.controlBar}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              className={styles.seekBar}
              style={{
                backgroundSize: `${(currentTime * 100) / duration}% 100%`,
              }}
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
            />
            <div className={styles.control}>
              {isPlaying ? (
                <FaPause onClick={togglePlay} className={styles.icon} />
              ) : (
                <FaPlay onClick={togglePlay} className={styles.icon} />
              )}
              <p>
                <span>{formateTime(currentTime)}</span> /{" "}
                <span>{formateTime(duration)}</span>
              </p>
              <select onChange={handleSelect} value={playbackSpeed}>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
                <option value={2.5}>2.5x</option>
                <option value={3}>3x</option>
              </select>
              <div onClick={toggleFullscreen}>
                {fullscreen ? (
                  <MdFullscreenExit className={styles.fullscreenBtn} />
                ) : (
                  <MdFullscreen className={styles.fullscreenBtn} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <video
        ref={videoRef}
        id={id}
        poster={poster}
        playsInline={playsInline}
        className={className}
        controls={controls}
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => {
          setIsPlaying(true);
        }}
      >
        <source src={videoURL} type={videoType} />
      </video>
    </div>
  );
};

export default Player;

"use client";
import Player from "@/components/player/player";
import VideoList from "@/components/videoList/videoList";
import { mediaJSON } from "@/components/videoList/videoList.constants";
import { CurrentVideo } from "@/context/context";
import { VideoData } from "@/types/globalTypes";
import { useState } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const [playingVideo, setPlayingVideo] = useState<VideoData>(
    mediaJSON?.categories?.[0]?.videos?.[0]
  );
  return (
    <CurrentVideo.Provider value={{ playingVideo, setPlayingVideo }}>
      <main className={styles.main}>
        <div>
          <Player autoPlay={true} videoURL={playingVideo?.sources?.[0]} />
          <div className={styles.videoDetails}>
            <h2>{playingVideo?.title}</h2>
            <p>{playingVideo?.subtitle}</p>
            <p className={styles.desc}>{playingVideo?.description}</p>
          </div>
        </div>
        <VideoList />
      </main>
    </CurrentVideo.Provider>
  );
}

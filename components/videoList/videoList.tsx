"use client";
import React, { useContext, useState } from "react";
import { mediaJSON } from "./videoList.constants";
import styles from "./videoList.module.scss";
import { CurrentVideo } from "@/context/context";
import { MdDragIndicator } from "react-icons/md";
import { VideoData } from "@/types/globalTypes";

const VideoList = () => {
  const [videoData, setVideoData] = useState(mediaJSON.categories[0].videos);
  const { setPlayingVideo } = useContext(CurrentVideo);
  const [draggingItem, setDraggingItem] = useState<VideoData | null>(null);
  const domainName = mediaJSON.categories[0].imageDomain;

  const handleDragStart = (e: any, video: VideoData) => {
    setDraggingItem(video);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any, video: VideoData) => {
    if (!draggingItem) return;

    const currentIndex = videoData.indexOf(draggingItem);
    const targetIndex = videoData.indexOf(video);

    if (currentIndex !== -1 && targetIndex !== -1) {
      videoData.splice(currentIndex, 1);
      videoData.splice(targetIndex, 0, draggingItem);
      setVideoData([...videoData]);
    }
  };

  return (
    <div className={styles.listContainer}>
      {videoData?.map((video) => {
        return (
          <div
            className={styles.listItem}
            key={video?.sources?.[0]}
            onClick={() => {
              setPlayingVideo(video);
            }}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, video)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, video)}
          >
            <img src={domainName + video?.thumb} alt="video thumb" />
            <div>
              <h4>{video?.title}</h4>
              <p>{video?.subtitle}</p>
            </div>
            <div className={styles.dragIconContainer}>
              <MdDragIndicator />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoList;

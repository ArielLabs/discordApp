import React from "react";
import { useSelector } from "react-redux";
import VideoPlayerItem from "../VideoPlayerItem/VideoPlayerItem";
import styles from "./VideoPlayers.module.css";

const VideoPlayers = () => {
  const { streams } = useSelector((state) => state.room);
  return (
    <div className={styles.videoPortals}>
      {streams.map((stream) => (
        <VideoPlayerItem key={stream.userSocketId} stream={stream} />
      ))}
    </div> 
  );
};

export default VideoPlayers;

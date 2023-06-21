import React from "react";
import RoomLabel from "../RoomLabel/RoomLabel";
import VideoPlayers from "../VideoPlayers/VideoPlayers";
import VideoButtons from "../VideoButtons/VideoButtons";
import styles from "./VideoSection.module.css";

const VideoSection = (props) => {
  return (
    <div className={styles.videoContainer}>
      <RoomLabel id={props.roomId} />
      <VideoPlayers />
      <VideoButtons />
    </div>
  );
};

export default VideoSection;

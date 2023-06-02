import React from "react";
import { useSelector } from "react-redux";
import RoomLabel from "../RoomLabel/RoomLabel";
import VideoButtons from "../VideoButtons/VideoButtons";
import styles from "./VideoSection.module.css";

const VideoSection = () => {
    const { id } = useSelector((state) => state.room);
    return(
        <div className={styles.videoContainer}>
            <RoomLabel roomId="1234-exn93" />
            <VideoButtons />
        </div>
    );
}

export default VideoSection;
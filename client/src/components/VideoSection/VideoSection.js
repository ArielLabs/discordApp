import React from "react";
import { useSelector } from "react-redux";
import styles from "./VideoSection.module.css";
import RoomLabel from "../RoomLabel/RoomLabel";

const VideoSection = () => {
    const { id } = useSelector((state) => state.room);
    return(
        <div className={styles.videoContainer}>
            <RoomLabel roomId="1234-exn93" />
            <div>video</div>
        </div>
    );
}

export default VideoSection;
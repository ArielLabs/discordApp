import React from "react";
import RoomLabel from "../RoomLabel/RoomLabel";
import VideoButtons from "../VideoButtons/VideoButtons";
import styles from "./VideoSection.module.css";

const VideoSection = (props) => {
    return(
        <div className={styles.videoContainer}>
            <RoomLabel id={props.roomId} />
            <VideoButtons />
        </div>
    );
}

export default VideoSection;
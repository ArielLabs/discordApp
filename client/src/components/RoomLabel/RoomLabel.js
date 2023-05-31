import React from "react";
import styles from "./RoomLabel.module.css";

const RoomLabel = (props) => {
    return(
        <div className={styles.roomLabel}>
            <p>ID: {props.roomId}</p>
        </div>
    );
}

export default RoomLabel;
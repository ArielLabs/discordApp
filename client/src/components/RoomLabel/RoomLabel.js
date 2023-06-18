import React from "react";
import styles from "./RoomLabel.module.css";

const RoomLabel = (props) => {
    return(
        <div className={styles.roomLabel}>
            <p>ID: <span className={styles.roomId}>{props.id}</span></p>
        </div>
    );
}

export default RoomLabel;
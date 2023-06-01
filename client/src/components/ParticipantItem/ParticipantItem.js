import React from "react";
import styles from "./ParticipantItem.module.css";

const ParticipantItem = (props) => {
    return(
        <div className={styles.item}>
            <span className={styles.dot}></span>
            <span>{props.name}</span>
        </div>
    );
}

export default ParticipantItem;
import React from "react";
import styles from "./ParticipantsHeader.module.css";

const ParticipantsHeader = (props) => {
    const { number } = props;
  return (
    <div className={styles.header}>
      <span className={styles.title}>Participants</span>
      <div className={styles.amount}>{number}</div>
    </div>
  );
};

export default ParticipantsHeader;

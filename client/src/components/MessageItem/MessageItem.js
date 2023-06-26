import React from "react";
import styles from "./MessageItem.module.css";

const MessageItem = (props) => {
  const { messageItem } = props;
  const time = messageItem.date.split(",")[1];
  const timeFormat = time.split(":")[0] + ":" + time.split(":")[1];
  return (
    <div className={styles.itemContainer}>
      <span className={styles.displayName}>{messageItem.username}</span>
      <span className={styles.content}>{messageItem.content}</span>
      <span className={styles.time}>{timeFormat}</span>
    </div>
  );
};

export default MessageItem;

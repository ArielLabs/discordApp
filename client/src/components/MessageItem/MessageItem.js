import React from "react";
import { useSelector } from "react-redux";
import styles from "./MessageItem.module.css";

const MessageItem = (props) => {
  const { userId } = useSelector((state) => state.room);
  const { messageItem } = props;

  const createdByMe = messageItem.userId === userId;

  const time = messageItem.date.split(",")[1];
  const timeFormat = time.split(":")[0] + ":" + time.split(":")[1];

  return (
    <div className={ createdByMe ? `${styles.itemRight}` : `${styles.itemLeft}`}>
      <div className={ createdByMe ? `${styles.itemContainerByMe}` : `${styles.itemContainer}`}>
        {!createdByMe && (
          <span className={styles.displayName}>{messageItem.username}</span>
        )}
        <div className={styles.messageBody}>
          <span className={styles.content}>{messageItem.content}</span>
          <span className={styles.time}>{timeFormat}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;

import React from "react";
import { useSelector } from "react-redux";
import MessageItem from "../MessageItem/MessageItem";
import styles from "./Messages.module.css";

const Messages = () => {
  const { messages } = useSelector((state) => state.room);
  return (
    <div className={styles.messgaesContainer}>
      {messages.map((message) => (
        <MessageItem key={message.id} messageItem={message} />
      ))}
    </div>
  );
};

export default Messages;
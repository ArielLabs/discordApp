import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { sendMessage, sendDirectMessage } from "../../utils/wss";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import styles from "./InputMessage.module.css";

const InputMessage = (props) => {
  const contentRef = useRef("");
  const { id, activeConversation } = useSelector((state) => state.room);

  const sendMessageByKeyPressHandler = (event) => {
    contentRef.current.value = event.target.value;
    if (event.key === "Enter" && contentRef.current.value.length > 0) {
      if (props.direct) {
        const newDirectMessage = {
          roomId: id,
          destUserId: activeConversation.userId,
          content: contentRef.current.value,
          date: new Date().toLocaleString("en-GB"),
        };
        sendDirectMessage(newDirectMessage);
      } else {
        const newMessage = {
          roomId: id,
          content: contentRef.current.value,
          date: new Date().toLocaleString("en-GB"),
        };
        sendMessage(newMessage);
      }
      contentRef.current.value = "";
    }
  };

  const sendMessageByClickHandler = (event) => {
    event.preventDefault();

    if (contentRef.current.value.length > 0) {
      if (props.direct) {
        const newDirectMessage = {
          roomId: id,
          destUserId: activeConversation.userId,
          content: contentRef.current.value,
          date: new Date().toLocaleString("en-GB"),
        };
        sendDirectMessage(newDirectMessage);
      } else {
        const newMessage = {
          roomId: id,
          content: contentRef.current.value,
          date: new Date().toLocaleString("en-GB"),
        };
        sendMessage(newMessage);
      }
      contentRef.current.value = "";
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        ref={contentRef}
        className={styles.inputMsg}
        onKeyDown={sendMessageByKeyPressHandler}
        placeholder="Send a message..."
      />
      <div className={styles.icon}>
        <IconButton onClick={sendMessageByClickHandler}>
          <SendIcon sx={{ color: "#80e3c1" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default InputMessage;

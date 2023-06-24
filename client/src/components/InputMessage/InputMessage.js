import React from "react";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import styles from "./InputMessage.module.css";

const InputMessage = () => {
  const sendMessageHandler = () => {};
  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.inputMsg}
        onKeyDown={sendMessageHandler}
        placeholder="Send a message..."
      />
      <div className={styles.icon}>
        <IconButton>
          <SendIcon sx={{ color: "#80e3c1" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default InputMessage;

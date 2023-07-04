import React, { useState } from "react";
import { useSelector } from "react-redux";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from "./DirectChat.module.css";
import InputMessage from "../InputMessage/InputMessage";

const DirectChat = (props) => {
  const [toggleDirectChat, setToggleDirectChat] = useState(false);
  const { activeConversation } = useSelector((state) => state.room);

  const toggleDirectChatHandler = () => {
    setToggleDirectChat((prevState) => !prevState);
  };

  let directChatContainerClass = toggleDirectChat
    ? `${styles.directChatContainer}`
    : `${styles.onlyHeaderdirectChat}`;

  let headerDirectChatClass = toggleDirectChat
    ? `${styles.header}`
    : `${styles.onlyHeader}`;

  return (
    <div className={directChatContainerClass}>
      <div className={headerDirectChatClass} onClick={toggleDirectChatHandler}>
        <span className={styles.identity}>{activeConversation ? activeConversation.identity : ""}</span>
        {!toggleDirectChat && <KeyboardArrowUpIcon className={styles.icon} />}
        {toggleDirectChat && <KeyboardArrowDownIcon className={styles.icon} />}
      </div>
      {toggleDirectChat && (
        <div className={styles.bodyDirectChat}>
          <div className={styles.messages}>
            
          </div>
          <InputMessage />
        </div>
      )}
    </div>
  );
};

export default DirectChat;

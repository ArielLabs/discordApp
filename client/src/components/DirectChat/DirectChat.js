import React, { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from "./DirectChat.module.css";
import InputMessage from "../InputMessage/InputMessage";

const DirectChat = (props) => {
  const [toggleDirectChat, setToggleDirectChat] = useState(false);
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
        {!toggleDirectChat && <KeyboardArrowUpIcon sx={{fontSize: "1.5rem", float: "right", marginRight: "2rem"}} />}
        {toggleDirectChat && <KeyboardArrowDownIcon sx={{fontSize: "1.5rem", float: "right", marginRight: "2rem"}} />}
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

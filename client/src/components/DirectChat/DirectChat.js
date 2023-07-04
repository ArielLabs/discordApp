import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InputMessage from "../InputMessage/InputMessage";
import MessageItem from "../MessageItem/MessageItem";
import styles from "./DirectChat.module.css";

const DirectChat = (props) => {
  const [toggleDirectChat, setToggleDirectChat] = useState(false);
  const [directMessages, setDiresctMessages] = useState([]);
  const { activeConversation, directChatMessages } = useSelector((state) => state.room);

  useEffect(() => {
    if(activeConversation && directChatMessages){
      if(directChatMessages[activeConversation.userId]){
        setDiresctMessages((prevState) => directChatMessages[activeConversation.userId]);
      }
    }
  }, [directChatMessages, activeConversation]);

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
            {directMessages.map((message) => (
              <MessageItem key={message.id} messageItem={message} />
            ))}
          </div>
          <InputMessage direct={true} />
        </div>
      )}
    </div>
  );
};

export default DirectChat;

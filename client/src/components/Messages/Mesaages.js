import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Messages.module.css";

const Messages = () => {
    const { messages } = useSelector((state) => state.room);
    useEffect(() => {
        console.log(messages);
    }, [messages]);
    return(
        <div></div>
    );
}

export default Messages;
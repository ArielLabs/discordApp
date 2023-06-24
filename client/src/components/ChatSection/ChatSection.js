import React from "react";
import Messages from "../Messages/Mesaages";
import InputMessage from "../InputMessage/InputMessage";
import wallpapaer from "../../assets/images/wallpaper.jpg";
import styles from "./ChatSection.module.css";

const ChatSection = () => {
    return(
        <div style={{ backgroundImage: `url(${wallpapaer})`, width: "25%" }}>
            <Messages />
            <InputMessage />
        </div>
    );
}

export default ChatSection;
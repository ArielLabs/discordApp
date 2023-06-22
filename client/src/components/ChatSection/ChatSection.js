import React from "react";
import wallpapaer from "../../assets/images/wallpaper.jpg";
import styles from "./ChatSection.module.css";

const ChatSection = () => {
    return(
        <div style={{ backgroundImage: `url(${wallpapaer})`, width: "25%" }}>
        </div>
    );
}

export default ChatSection;
import React from "react";
import ParticipantsSection from "../../components/ParticipantsSection/ParticipantsSection";
import VideoSection from "../../components/VideoSection/VideoSection";
import ChatSection from "../../components/ChatSection/ChatSection";
import styles from "./RoomPage.module.css";

const RoomPage = () => {
  return (
    <div className={styles.roomPage}>
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
    </div>
  );
};

export default RoomPage;

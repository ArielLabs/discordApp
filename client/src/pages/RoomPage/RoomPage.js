import React, { useEffect } from "react";
import { getLocalPreviewAndInitRoomConnection } from "../../services/webRTC";
import { useSelector } from "react-redux";
import ParticipantsSection from "../../components/ParticipantsSection/ParticipantsSection";
import VideoSection from "../../components/VideoSection/VideoSection";
import ChatSection from "../../components/ChatSection/ChatSection";
import styles from "./RoomPage.module.css";

const RoomPage = () => {
  const { id, identity, isRoomHost } = useSelector((state) => state.room);
  useEffect(() => {
    getLocalPreviewAndInitRoomConnection(isRoomHost, identity, id);
  }, [id, identity, isRoomHost]);

  return (
    <div className={styles.roomPage}>
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
    </div>
  );
};

export default RoomPage;

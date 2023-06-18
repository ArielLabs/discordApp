import React, { useEffect } from "react";
import { getLocalPreviewAndInitRoomConnection } from "../../services/webRTC";
import { useSelector, useDispatch } from "react-redux";
import ParticipantsSection from "../../components/ParticipantsSection/ParticipantsSection";
import VideoSection from "../../components/VideoSection/VideoSection";
import ChatSection from "../../components/ChatSection/ChatSection";
import styles from "./RoomPage.module.css";

const RoomPage = () => {
  const { id, identity, isRoomHost } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    getLocalPreviewAndInitRoomConnection(isRoomHost, identity, id, dispatch);
  }, [identity, isRoomHost, dispatch]);

  return (
    <div className={styles.roomPage}>
      <ParticipantsSection />
      <VideoSection roomId={id} />
      <ChatSection />
    </div>
  );
};

export default RoomPage;
import React from "react";
import { useSelector } from "react-redux";
import ParticipantsHeader from "../ParticipantsHeader/ParticipantsHeader";
import ParticipantItem from "../ParticipantItem/ParticipantItem";
import DirectChat from "../DirectChat/DirectChat";
import styles from "./ParticipantsSection.module.css";

const ParticipantsSection = () => {
  const { participants } = useSelector((state) => state.room);
  return (
    <div className={styles.participantsContainer}>
      <ParticipantsHeader number={participants.length} />
      <div className={styles.details}>
        <div className={styles.list}>
          {participants.map((participant) => (
            <ParticipantItem
              key={participant.userId}
              name={participant.username}
            />
          ))}
        </div>
        <DirectChat />
      </div>
    </div>
  );
};

export default ParticipantsSection;

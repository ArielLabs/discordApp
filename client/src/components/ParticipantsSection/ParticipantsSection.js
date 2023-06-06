import React from "react";
import { useSelector } from "react-redux";
import ParticipantsHeader from "../ParticipantsHeader/ParticipantsHeader";
import ParticipantItem from "../ParticipantItem/ParticipantItem";
import styles from "./ParticipantsSection.module.css";

const ParticipantsSection = () => {
  const { participants } = useSelector((state) => state.room);
  return (
    <div className={styles.participantsContainer}>
      <ParticipantsHeader number={participants.length} />
      {participants.map((participant) => (
        <ParticipantItem key={participant.userId} name={participant.username} />
      ))}
    </div>
  );
};

export default ParticipantsSection;

import React from "react";
import ParticipantsHeader from "../ParticipantsHeader/ParticipantsHeader";
import ParticipantItem from "../ParticipantItem/ParticipantItem";
import styles from "./ParticipantsSection.module.css";

const dummy = [
  { id: "j01", identity: "Jake" },
  { id: "j02", identity: "Peter" },
  { id: "j03", identity: "Dennis" },
  { id: "j04", identity: "Avatar" },
];

const ParticipantsSection = () => {
  return (
    <div className={styles.participantsContainer}>
      <ParticipantsHeader number={dummy.length} />
      {dummy.map((participant) => (
        <ParticipantItem key={participant.id} name={participant.identity} />
      ))}
    </div>
  );
};

export default ParticipantsSection;

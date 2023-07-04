import React from "react";
import { useDispatch } from "react-redux";
import { roomActions } from "../../store/room";
import styles from "./ParticipantItem.module.css";

const ParticipantItem = (props) => {
  const dispatch = useDispatch();

  const chosenParticipant = () => {
    const chosenParticipantDetails = {
      userId: props.userId,
      identity: props.name,
    };
    dispatch(roomActions.setActiveConversation(chosenParticipantDetails));
  };
  return (
    <div className={styles.item} onClick={chosenParticipant}>
      <span className={styles.dot}></span>
      <span>{props.name}</span>
    </div>
  );
};

export default ParticipantItem;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ConnectingButtons.module.css";

const ConnectingButtons = () => {
  const navigate = useNavigate();

  const joinMeetingHandler = () => {
    navigate("join-room");
  };

  const hostMeetingHandler = () => {
    navigate("join-room?host=true");
  };

  return (
    <div className={styles.btns}>
      <button className={styles.joinBtn} onClick={joinMeetingHandler}>
        Join a meeting
      </button>
      <button className={styles.hostBtn} onClick={hostMeetingHandler}>
        Host a meeting
      </button>
    </div>
  );
};

export default ConnectingButtons;

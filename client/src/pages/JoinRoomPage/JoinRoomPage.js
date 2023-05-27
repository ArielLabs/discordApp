import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../store/room";
import { useLocation } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from "./JoinRoomPage.module.css";

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [optionAudio, setOptionAudio] = useState(false);
  const isRoomHost = useSelector((state) => state.room.isRoomHost);
  const dispatch = useDispatch();
  const search = useLocation().search;

  useEffect(() => {
    const isRoomHostUrl = new URLSearchParams(search).get("host");
    if (isRoomHostUrl) {
      dispatch(roomActions.setIsRoomHost(true));
    } else {
      dispatch(roomActions.setIsRoomHost(false));
    }
  }, []);

  const changeRoomIdHandler = (event) => {
    setRoomId(event.target.value);
  };

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };

  const changeOptionAudioHandler = (event) => {
    setOptionAudio(event.target.checked);
  }

  const titleText = isRoomHost ? "Host meeting" : "Join meeting";

  return (
    <div className={styles.joinRoom}>
      <div className={styles.joinRoomPanel}>
        <h2>{titleText}</h2>
        <div className={styles.form}>
          {!isRoomHost && (
            <input
              type="text"
              className={styles.joinInput}
              onChange={changeRoomIdHandler}
              placeholder="Enter meeting ID"
            />
          )}
          <input
            type="text"
            className={styles.joinInput}
            onChange={changeNameHandler}
            placeholder="Enter your name"
          />
        </div>
        <FormControlLabel
          label="Only audio"
          control={
            <Checkbox
                checked={optionAudio}
                onChange={changeOptionAudioHandler} 
            />
          }
        />
      </div>
    </div>
  );
};

export default JoinRoomPage;

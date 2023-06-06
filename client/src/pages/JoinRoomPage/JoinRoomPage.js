import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../store/room";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./JoinRoomPage.module.css";

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { isRoomHost, connectWithAudio } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useLocation().search;

  useEffect(() => {
    const isRoomHostUrl = new URLSearchParams(search).get("host");
    if (isRoomHostUrl) {
      dispatch(roomActions.setIsRoomHost(true));
    } else {
      dispatch(roomActions.setIsRoomHost(false));
    }
  }, [dispatch, search]);

  const changeRoomIdHandler = (event) => {
    setRoomId(event.target.value);
  };

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };

  const changeOptionAudioHandler = (event) => {
    dispatch(roomActions.setConnectWithAudio(event.target.checked));
  };

  const joinRoomHandler = () => {
    dispatch(roomActions.setIdentity(name));
    if(isRoomHost){
      createRoom();
    }else{
      isExistsRoom();
    }
  };

  const cancelHandler = () => {
    navigate('/');
  };

  const createRoom = () => {
    navigate('/room');
  }

  const checkIsExistsRoom = () => {
    const roomExistsUrl = `http://localhost:5000/api/roomExists/${roomId}`;
    return axios.get(roomExistsUrl);
  }

  const { refetch: isExistsRoom} = useQuery({
    queryKey: 'exists-room',
    queryFn: checkIsExistsRoom,
    enabled: false,
    onSuccess: (res) => {
      const { roomExists, full } = res.data;
      if(roomExists){
        if(full){
          setError("Meeting is full, please try again later.");
        }else{
          dispatch(roomActions(setRoomId(roomId)));
          navigate('/room');
        }
      }else{
        setError("Meeting not found, check your meeting id.");
      }
    }
  })

  const titleText = isRoomHost ? "Host meeting" : "Join meeting";
  const btnText = isRoomHost ? "Host" : "Join";

  return (
    <div className={styles.joinRoom}>
      <div className={styles.joinRoomPanel}>
        <div className={styles.joinRoomContent}>
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
                checked={connectWithAudio}
                onChange={changeOptionAudioHandler}
              />
            }
          />
        </div>
        <div className={styles.errorArea}>
          <p className={styles.error}>{error}</p>
        </div>
        <div className={styles.action}>
          <button className={styles.btnRoom} onClick={joinRoomHandler}>{btnText}</button>
          <button className={styles.btnCancel} onClick={cancelHandler}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomPage;

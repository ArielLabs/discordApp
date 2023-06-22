import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { roomActions } from "../../store/room";
import { leaveRoom } from "../../utils/wss";
import IconButton from "@mui/material/IconButton";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import CameraswitchOutlinedIcon from '@mui/icons-material/CameraswitchOutlined';
import styles from "./VideoButtons.module.css";

const VideoButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);
  const [isSharingScreenActive, setIsSharingScreenActive] = useState(false);

  const pressMicButtonHandler = () => {
    dispatch(roomActions.setIsMuted());
    setIsMicMuted((prevState) => !prevState);
  };

  const pressCameraButtonHandler = () => {
    dispatch(roomActions.setIsDisplayVideo());
    setIsLocalVideoDisabled((prevState) => !prevState);
  };

  const pressLeaveRoomHandler = () => {
    navigate("/");
    leaveRoom();
  };

  const pressSharingScreenButtonHandler = () => {
    setIsSharingScreenActive((prevState) => !prevState);
  };

  return (
    <div className={styles.buttonsContainer}>
      <IconButton size="large" onClick={pressMicButtonHandler}>
        {!isMicMuted && <MicNoneOutlinedIcon sx={{ color: "white" }} />}
        {isMicMuted && <MicOffOutlinedIcon sx={{ color: "white" }} />}
      </IconButton>
      <IconButton size="large" onClick={pressCameraButtonHandler}>
        {!isLocalVideoDisabled && (
          <VideocamOutlinedIcon sx={{ color: "white" }} />
        )}
        {isLocalVideoDisabled && (
          <VideocamOffOutlinedIcon sx={{ color: "white" }} />
        )}
      </IconButton>
      <button className={styles.leaveBtn} onClick={pressLeaveRoomHandler}>
        Leave Room
      </button>
      <IconButton size="large" onClick={pressSharingScreenButtonHandler}>
        {!isSharingScreenActive && (
          <CameraswitchOutlinedIcon sx={{ color: "white" }} />
        )}
        {isSharingScreenActive && (
          <CameraswitchOutlinedIcon sx={{ color: "white" }} />
        )}
      </IconButton>
    </div>
  );
};

export default VideoButtons;

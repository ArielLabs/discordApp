import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { roomActions } from "../../store/room";
import { leaveRoom } from "../../utils/wss";
import { toggleScreenShare } from "../../services/webRTC";
import LocalScreenSharing from "../LocalScreenSharing/LocalScreenSharing";
import IconButton from "@mui/material/IconButton";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import CameraswitchOutlinedIcon from '@mui/icons-material/CameraswitchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./VideoButtons.module.css";

const VideoButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);
  const [isSharingScreenActive, setIsSharingScreenActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

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

  const pressSharingScreenButtonHandler = async () => {
    if(!isSharingScreenActive){
      let shareStream = null;
      try{
        shareStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: false});
      }catch(err){
        console.log("error occured when try to get an access to screen share stream");
      }
      if(shareStream){
        setScreenSharingStream(shareStream);
        toggleScreenShare(isSharingScreenActive, shareStream);

        setIsSharingScreenActive(true);
      }
    }else{
      // switch stream from camera
      toggleScreenShare(isSharingScreenActive);
      setIsSharingScreenActive(false);

      // stop screen share 
      screenSharingStream.getTracks().forEach(element => element.stop());
      setScreenSharingStream(null);
    }

  };

  return (
    <div className={styles.buttonsContainer}>
      {isSharingScreenActive && (
        <LocalScreenSharing stream={screenSharingStream} />
      )}
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
      <IconButton size="large" onClick={pressSharingScreenButtonHandler}>
        {!isSharingScreenActive && (
          <CameraswitchOutlinedIcon sx={{ color: "white" }} />
        )}
        {isSharingScreenActive && (
          <CameraswitchOutlinedIcon sx={{ color: "white" }} />
        )}
      </IconButton>
      <IconButton size="large" onClick={pressLeaveRoomHandler}>
        <LogoutIcon sx={{ color: "white" }} />
      </IconButton>
    </div>
  );
};

export default VideoButtons;

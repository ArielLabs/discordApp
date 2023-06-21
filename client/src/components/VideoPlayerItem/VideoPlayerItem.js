import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "./VideoPlayerItem.css";

const VideoPlayerItem = (props) => {
  const usernameRef = useRef();
  const videoRef = useRef(null);
  const { stream } = props;
  const { participants, identity } = useSelector((state) => state.room);
  let zoomVideo = false;

  const zoomHandler = (event) => {
    const videoClass = document.getElementById(event.target.id);
    const boxClass = document.getElementById(event.target.id + "Box");

    if (zoomVideo) {
      document.querySelectorAll(".videoPlayer").forEach((videoPlayerClass) => {
        videoPlayerClass.style.display = "initial";
      });
      document.querySelectorAll(".identity").forEach((identityclass) => {
        identityclass.classList.toggle("identityHidden");
      });
      boxClass.classList.toggle("fullBoxScreen");
      videoClass.classList.toggle("fullVideoPlayer");
      zoomVideo = !zoomVideo;
    } else {
      document.querySelectorAll(".identity").forEach((identityclass) => {
        identityclass.classList.toggle("identityHidden");
      });
      document.querySelectorAll(".videoPlayer").forEach((videoPlayerClass) => {
        if (videoPlayerClass.id !== event.target.id) {
          videoPlayerClass.style.display = "none";
        }
      });
      boxClass.classList.toggle("fullBoxScreen");
      videoClass.classList.toggle("fullVideoPlayer");
      zoomVideo = !zoomVideo;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream.liveStream;
      const user = participants.find(
        (participant) => participant.socketId === stream.userSocketId
      );
      if (user) {
        usernameRef.current.innerText = user.username;
      } else {
        if (stream.userSocketId === "1") {
          usernameRef.current.innerText = identity;
        } else {
          usernameRef.current.innerText = "";
        }
      }
    }
  }, [stream, participants, identity]);

  return (
    <div id={`${stream.userSocketId}Box`} className="box">
      <div id={`${stream.userSocketId}Identity`} className="identity">
        <span ref={usernameRef}></span>
      </div>
      <video
        id={stream.userSocketId}
        ref={videoRef}
        onClick={zoomHandler}
        className="videoPlayer"
        autoPlay
      />
    </div>
  );
};

export default VideoPlayerItem;

import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./VideoPlayers.css";

const VideoPlayers = () => {
  const { streams, participants, identity } = useSelector(
    (state) => state.room
  );
  const userNameFirst = useRef();
  const userNameSecond = useRef();
  const userNameThird = useRef();
  const userNameFourth = useRef();
  const videoRefFirst = useRef(null);
  const videoRefSecond = useRef(null);
  const videoRefThird = useRef(null);
  const videoRefFourth = useRef(null);
  const [zoomVideo, setZoomVideo] = useState(null);

  const zoomHandler = (event) => {
    const videoClass = document.getElementById(event.target.id);
    const boxClass = document.getElementById(event.target.id + "Box");

    setZoomVideo((prevState) => {
      if (prevState) {
        document.querySelectorAll(".videoPlayer").forEach((videoPlayerClass) => {
            videoPlayerClass.style.display = "initial";
        });
        document.querySelectorAll(".identity").forEach((identityclass) => {
            identityclass.classList.toggle("identityHidden");
        });
        boxClass.classList.toggle("fullBoxScreen");
        videoClass.classList.toggle("fullVideoPlayer");
        return null;
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
        return event.target.id;
      }
    });
  };

  useEffect(() => {
    if (videoRefFirst.current) {
      videoRefFirst.current.srcObject = streams[0];
      userNameFirst.current.innerText = identity;
    }
    if (videoRefSecond.current && streams.length > 1) {
      videoRefSecond.current.srcObject = streams[1].liveStream;
      const user = participants.find(
        (participant) => participant.socketId === streams[1].userSocketId
      );
      if(user){
        userNameSecond.current.innerText = user.username;
      }
    }
    if (videoRefThird.current && streams.length > 2) {
      videoRefThird.current.srcObject = streams[2].liveStream;
      const user = participants.find(
        (participant) => participant.socketId === streams[2].userSocketId
      );
      if(user){
        userNameThird.current.innerText = user.username;
      }
    }
    if (videoRefFourth.current && streams.length > 3) {
      videoRefFourth.current.srcObject = streams[3].liveStream;
      const user = participants.find(
        (participant) => participant.socketId === streams[3].userSocketId
      );
      if(user){
        userNameFourth.current.innerText = user.username;
      }
    }
  }, [streams, participants, identity]);

  return (
    <div className="videoPortals">
      <div id="v1Box" className="box">
        <video
          id="v1"
          ref={videoRefFirst}
          className="videoPlayer"
          onClick={zoomHandler}
          autoPlay
        />
        <div id="v1Identity" className="identity">
          <span ref={userNameFirst}></span>
        </div>
      </div>
      <div id="v2Box" className="box">
        <video
          id="v2"
          ref={videoRefSecond}
          className="videoPlayer"
          onClick={zoomHandler}
          autoPlay
        />
        <div id="v2Identity" className="identity">
          <span ref={userNameSecond}></span>
        </div>
      </div>
      <div id="v3Box" className="box">
        <video
          id="v3"
          ref={videoRefThird}
          className="videoPlayer"
          onClick={zoomHandler}
          autoPlay
        />
        <div id="v3Identity" className="identity">
          <span ref={userNameThird}></span>
        </div>
      </div>
      <div id="v4Box" className="box">
        <video
          id="v4"
          ref={videoRefFourth}
          className="videoPlayer"
          onClick={zoomHandler}
          autoPlay
        />
        <div id="v4Identity" className="identity">
          <span ref={userNameFourth}></span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayers;

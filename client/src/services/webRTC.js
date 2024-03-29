import { createNewRoom, joinRoom, signalPeerData } from "../utils/wss";
import { roomActions } from "../store/room";
import Peer from "simple-peer";

let localStream;
let peers = {};
let incomingStreams = [];
const defaultConstraints = {
  audio: true,
  video: {
    width: "480",
    height: "360",
  },
};

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
};

const switchVideoTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};


export const getLocalPreviewAndInitRoomConnection = async (
  isRommHost,
  userId, 
  identity,
  roomId = null,
  dispatch
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      localStream = stream;
      incomingStreams.push({
        userSocketId: "1",
        liveStream: localStream,
        isActive: true
      });
      // incomingStreams.push(localStream);
      dispatch(roomActions.setStreams(incomingStreams));

      if (isRommHost) {
        createNewRoom(userId, identity);
      } else {
        joinRoom(userId, identity, roomId);
      }
    })
    .catch((err) => {
      console.log("error occured when trying to get an access to local stream");
      console.log(err);
    });
};

export const prepareNewPeerConnection = (
  newUserSocketId,
  isInitiator,
  dispatch
) => {
  // if isInitiator is true then newUserSocketId is existSocketId
  const configuration = getConfiguration();

  peers[newUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[newUserSocketId].on("signal", (data) => {
    // webRTC offer, webRTC answer SDP information, ice candidates
    const signalData = {
      signal: data,
      newUserSocketId: newUserSocketId,
    };

    signalPeerData(signalData);
  });

  peers[newUserSocketId].on("stream", (remoteStream) => {
    console.log("new remote stream");
    const userStream = {
      userSocketId: newUserSocketId,
      liveStream: remoteStream,
      isActive: true
    };

    // remove disactive stream
    incomingStreams = incomingStreams.filter((stream) => stream.isActive !== false);

    // add new remote stream
    incomingStreams.push(userStream);
    dispatch(roomActions.setStreams(incomingStreams));
  });
};

export const signalingDataHandler = (data) => {
  const { signal, existSocketId } = data;

  peers[existSocketId].signal(signal);
};

export const removePeerConnection = (userSocketId, dispatch) => {
  const turnOffStreamIdx = incomingStreams.findIndex((stream) => stream.userSocketId === userSocketId);
  incomingStreams[turnOffStreamIdx] = {
    userSocketId: userSocketId,
    liveStream: null,
    isActive: false
  };

  dispatch(roomActions.setStreams(incomingStreams));

  if(peers[userSocketId]){
    peers[userSocketId].destroy();
  }

  delete peers[userSocketId];
};

export const toggleScreenShare = (
  isScreenSharingActive,
  screenSharingStream = null
) => {
  if (isScreenSharingActive) {
    switchVideoTracks(localStream);
  } else {
    switchVideoTracks(screenSharingStream);
  }
};
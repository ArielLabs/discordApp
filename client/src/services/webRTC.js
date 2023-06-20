import { createNewRoom, joinRoom, signalPeerData } from "../utils/wss";
import { roomActions } from "../store/room";
import Peer from "simple-peer";

let localStream;
let peers = {};
const incomingStreams = [];
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

export const getLocalPreviewAndInitRoomConnection = async (
  isRommHost,
  identity,
  roomId = null,
  dispatch
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      localStream = stream;
      incomingStreams.push(localStream);
      dispatch(roomActions.setStreams(incomingStreams));

      if (isRommHost) {
        createNewRoom(identity);
      } else {
        joinRoom(identity, roomId);
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
      liveStream: remoteStream
    };
    incomingStreams.push(userStream);
    dispatch(roomActions.setStreams(incomingStreams));
  });
};

export const signalingDataHandler = (data) => {
  const { signal, existSocketId } = data;

  peers[existSocketId].signal(signal);
};

export const removePeerConnection = (userSocketId, dispatch) => {
  // incomingStreams.forEach(stream => {
  //   if
  // });
};

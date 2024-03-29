import { roomActions } from "../store/room";
import { prepareNewPeerConnection, signalingDataHandler, removePeerConnection } from "../services/webRTC";
import socketIO from "socket.io-client";

const SERVER = "http://localhost:5000";
const webSocket = socketIO(SERVER);

export const connectWithSocketIOServer = (dispatch) => {
    webSocket.connect();

    webSocket.on('room-id', ({roomId}) => {
        dispatch(roomActions.setRoomId(roomId));
    });

    webSocket.on('room-update', (data) => {
        const { connectedUsers } = data;
        dispatch(roomActions.setParticipants(connectedUsers));
    });

    webSocket.on('messages-update', (data) => {
        const { messagesUsers } = data;
        dispatch(roomActions.setMessages(messagesUsers));
    });

    webSocket.on("direct-messages-update", (data) => {
        const { directMsg } = data;
        dispatch(roomActions.setDirectChatMessages(directMsg));
    })

    webSocket.on('connection-prepare', (data) => {
        const { newUserSocketId } = data;
        prepareNewPeerConnection(newUserSocketId, false, dispatch);

        webSocket.emit("connection-init", { newUserSocketId: newUserSocketId });
    });

    webSocket.on('connection-signal', (data) => {
        signalingDataHandler(data);
    });

    webSocket.on("connection-init", (data) => {
        const { existingUser } = data;
        prepareNewPeerConnection(existingUser, true, dispatch);
    });

    webSocket.on("user-disconnected", (data) => {
        const { userSocketId } = data;
        removePeerConnection(userSocketId, dispatch);
    });
}

export const createNewRoom = (userId, identity) => {
    const data = {
        userId: userId,
        identity: identity
    }

    webSocket.emit('create-new-room', data);
}

export const joinRoom = (userId, identity, roomId) => {
    const data = {
        roomId: roomId,
        userId: userId,
        identity: identity
    }

    webSocket.emit('join-room', data);
}

export const sendMessage = (message) => {
    webSocket.emit("send-message", message);
}

export const sendDirectMessage = (message) => {
    webSocket.emit("send-direct-message", message);
}

export const signalPeerData = (data) => {
    webSocket.emit('connection-signal', data);
}

export const leaveRoom = () => {
    webSocket.emit("leave-room");
}
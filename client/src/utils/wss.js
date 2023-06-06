import { roomActions } from "../store/room";
import socketIO from "socket.io-client";

const SERVER = "http://localhost:5000";
const webSocket = socketIO(SERVER);

export const connectWithSocketIOServer = (dispatch) => {
    webSocket.connect();
    webSocket.on('room-id', ({roomId}) => {
        dispatch(roomActions.setRoomId(roomId));
    })
}

export const createNewRoom = (identity) => {
    const data = {
        identity: identity
    }

    webSocket.emit('create-new-room', data);
}

export const joinRoom = (identity, roomId) => {
    const data = {
        roomId: roomId,
        identity: identity
    }

    webSocket.emit('join-room', data);
}
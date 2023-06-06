import { v4 as uuidv4 } from "uuid";
import { allRooms, allConnectedUsers } from "../globals/globals.js";

const createNewRoom = (socket, data) => {
  console.log("host is creating new room");

  const { identity } = data;
  const roomId = uuidv4();

  const newUser = {
    username: identity,
    userId: uuidv4(),
    roomId: roomId,
    socketId: socket.id 
  };

  allConnectedUsers.push(newUser);

  const newRoom = {
    id: roomId,
    connectedUsers: [newUser]
  };

  socket.join(roomId);

  allRooms.push(newRoom);

  socket.emit('room-id', {roomId: roomId});

  socket.emit("room-update", {connectedUsers: newRoom.connectedUsers});
};

export const roomHandler = (socket) => {
  socket.on("create-new-room", (data) => {
    createNewRoom(socket, data);
  });
};

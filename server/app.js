import express from "express";
import http from "http";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors());

let allRooms = [];
let allConnectedUsers = [];

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
  
  
const joinRoom = (socket, data) => {
    const { identity, roomId } = data;
  
    const newUser = {
      username: identity,
      userId: uuidv4(),
      roomId: roomId,
      socketId: socket.id
    }
  
    allConnectedUsers.push(newUser);
  
    const chosenRoom = allRooms.find((room) => room.id === roomId);
    chosenRoom.connectedUsers.push(newUser);
  
    socket.join(roomId);

    io.to(roomId).emit("room-update",  {connectedUsers: chosenRoom.connectedUsers});
};


io.on('connection', (socket) => {
    console.log(`user ${socket.id} - connect`);

    socket.on("create-new-room", (data) => {
        createNewRoom(socket, data);
    });
    
    socket.on("join-room", (data) => {
        joinRoom(socket, data);
    })
})


app.get("/api/roomExists/:roomId", (req, res) => {
    const { roomId } = req.params;
    const room = allRooms.find((room) => room.id === roomId);

    if(room){
        if(room.connectedUsers.length > 3){
            return res.send({ roomExists: true, full: true });
        }else{
            return res.send({ roomExists: true, full: false });
        }
    }else{
        return res.send({ roomExists: false });
    }
})

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
    console.log(`server running at: http://localhost:${port}`);
})
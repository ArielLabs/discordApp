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
});

app.use(cors());

let allRooms = [];
let allConnectedUsers = [];

const createNewRoom = (socket, data) => {
    console.log("host is creating new room");
  
    const { userId, identity } = data;
    const roomId = uuidv4();
  
    const newUser = {
      username: identity,
      userId: userId,
      roomId: roomId,
      socketId: socket.id,
      directMessages: {}
    };
  
    allConnectedUsers.push(newUser);
  
    const newRoom = {
      id: roomId,
      connectedUsers: [newUser],
      messagesUsers: {}
    };

    newRoom.messagesUsers[newUser.socketId] = [];
  
    socket.join(roomId);
  
    allRooms.push(newRoom);
  
    socket.emit('room-id', {roomId: roomId});
  
    socket.emit("room-update", {connectedUsers: newRoom.connectedUsers});
};
  
  
const joinRoom = (socket, data) => {
    const { identity, roomId, userId } = data;
  
    const newUser = {
      username: identity,
      userId: userId,
      roomId: roomId,
      socketId: socket.id,
      directMessages: {}
    }
  
    allConnectedUsers.push(newUser);
  
    const chosenRoom = allRooms.find((room) => room.id === roomId);

    chosenRoom.connectedUsers.forEach(user => {
        user.directMessages[newUser.userId] = [];
        newUser.directMessages[user.userId] = [];
    });

    chosenRoom.connectedUsers.push(newUser);
    chosenRoom.messagesUsers[newUser.socketId] = [];
  
    socket.join(roomId);

    // emit to all users which are already in this room to prepare peer connection
    (chosenRoom.connectedUsers).forEach(user => {
        if(user.socketId !== newUser.socketId){
            const data = {
                newUserSocketId: newUser.socketId
            };
            io.to(user.socketId).emit('connection-prepare', data);
        }
    });

    io.to(roomId).emit("room-update",  {connectedUsers: chosenRoom.connectedUsers});
};


const sendMessage = (socket, data) => {
    const { roomId, content, date } = data;

    const room = allRooms.find((r) => r.id === roomId);

    const writer = room.connectedUsers.find((user) => user.socketId === socket.id);

    const newMessage = {
        id: uuidv4(),
        userId: writer.userId,
        username: writer.username,
        content: content,
        date: date
    }

    Object.keys(room.messagesUsers).forEach(userSocketId => {
        room.messagesUsers[userSocketId].push(newMessage);
        io.to(userSocketId).emit("messages-update", {messagesUsers: room.messagesUsers[userSocketId]});
    });
};


const sendDirectMessage = (socket, data) => {
    const { roomId, destUserId, content, date  } = data;

    const room = allRooms.find((r) => r.id === roomId);

    const writerIdx = room.connectedUsers.findIndex((user) => user.socketId === socket.id);
    const writer = room.connectedUsers[writerIdx];

    const destUserIdx = room.connectedUsers.findIndex((user) => user.userId === destUserId);
    const destinationUser = room.connectedUsers[destUserIdx];

    const newMessage = {
        id: uuidv4(),
        userId: writer.userId,
        username: writer.username,
        content: content,
        date: date
    }

    room.connectedUsers.forEach((element, index) => {
        if(index === writerIdx){
            room.connectedUsers[index].directMessages[destinationUser.userId].push(newMessage);
            io.to(writer.socketId).emit("direct-messages-update", {directMsg: writer.directMessages});
        }else if(index === destUserIdx){
            room.connectedUsers[index].directMessages[writer.userId].push(newMessage);
            io.to(destinationUser.socketId).emit("direct-messages-update", {directMsg: destinationUser.directMessages});
        }
    });
}


const signaling = (socket, data) => {
    const { signal, newUserSocketId } = data;

    const signalingData = {
        signal: signal,
        existSocketId: socket.id
    }
    io.to(newUserSocketId).emit("connection-signal", signalingData);
} 

// information from clients which are already in room that they have prepared for incoming connection
const initializeConnect = (socket, data) => {
    const { newUserSocketId } = data;

    const initData = {
        existingUser: socket.id
    }
    io.to(newUserSocketId).emit("connection-init", initData);
}


const disconnection = (socket) => {
    const userLeave = allConnectedUsers.find((user) => user.socketId === socket.id);

    if(userLeave){
        allConnectedUsers = allConnectedUsers.filter((user) => user.socketId !== socket.id);

        const room = allRooms.find((room) => room.id === userLeave.roomId);
        room.connectedUsers = (room.connectedUsers).filter((user) => user.userId !== userLeave.userId);
    
        socket.leave(userLeave.roomId);

        // emit to all users which are still in the room that user disconnected
        io.to(room.id).emit("user-disconnected", { userSocketId: socket.id });

        if(room.connectedUsers.length > 0){
            io.to(room.id).emit("room-update", {connectedUsers: room.connectedUsers});
        }else{
            allRooms = allRooms.filter((r) => r.id !== room.id);
        }
    }
};


io.on('connection', (socket) => {
    console.log(`user ${socket.id} - connect`);

    socket.on("create-new-room", (data) => {
        createNewRoom(socket, data);
    });
    
    socket.on("join-room", (data) => {
        joinRoom(socket, data);
    });

    socket.on("send-message", (data) => {
        sendMessage(socket, data);
    });

    socket.on("send-direct-message", (data) => {
        sendDirectMessage(socket, data);
    });

    socket.on("connection-signal", (data) => {
        signaling(socket, data);
    });

    socket.on("connection-init", (data) => {
        initializeConnect(socket, data);
    })

    socket.on('leave-room', () => {
        disconnection(socket);
    })

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} - disconnect`);
        disconnection(socket);
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
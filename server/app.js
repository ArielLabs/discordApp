import express from "express";
import http from "http";
import cors from "cors";
import { roomHandler } from "./services/roomHandler.js";
import { allRooms, allConnectedUsers } from "./globals/globals.js";
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

io.on('connection', (socket) => {
    console.log(`user ${socket.id} - connect`);

    roomHandler(socket);
})

app.get("/api/roomExists/:roomId", (req, res) => {
    const { roomId } = req.params;
    const room = allRooms.find((room) => room._id === roomId);

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
import express from "express";
import http from "http";
import cors from "cors";
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

let rooms = [];
let connectedUsers = [];

app.get("/api/roomExists/:roomId", (req, res) => {
    const { roomId } = req.params;
    const room = rooms.find((room) => room._id === roomId);

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

app.listen(port, () => {
    console.log(`server running at: http://localhost:${port}`);
})
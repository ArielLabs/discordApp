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

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running at: http://localhost:${port}`);
})
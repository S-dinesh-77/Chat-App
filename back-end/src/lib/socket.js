import { Server } from "socket.io";
import http from "http";
import express from "express";


const app = express();
const server = http.createServer(app);

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
  }

const userSocketMap = {}; // {userId: socketId}

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
    },
  });

  


  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
   
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

   io.send    // is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOonlineUsers", Object.keys(userSocketMap))
    });
  });
  export {io, app, server}
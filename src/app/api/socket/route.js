// app/api/socket/route.js
import { NextResponse } from "next/server";
import { Server } from "socket.io";

let io;

export function GET(request) {
  if (!io) {
    io = new Server(3000, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      // Handle incoming messages
      socket.on("message", (msg) => {
        console.log("Message received:", msg);
        socket.broadcast.emit("message", msg);
      });

      // Handle client disconnect
      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  return NextResponse.json({ message: "Socket.IO server initialized" });
}

const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public/chat.html"));
});

io.on("connect", (socket) => {
  console.log("user connected");
  socket.on("send message", (msg) => {
    socket.broadcast.emit("receive msg", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`server running on port ${port}`));
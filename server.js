const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 5000;
var j;
var users = [];

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public/chat.html"));
});

io.on("connect", (socket) => {
  console.log("user connected");
  socket.on("send message", (msg) => {
    socket.to(msg.room).emit("receive msg", msg);
  });
  socket.on("join room", (room, name) => {
    socket.join(room);
    io.emit("room joined", { joined: true, name });
    users.push(socket.id);
    io.emit("active counter", users.length);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    users = users.filter((user) => user !== socket.id);
    io.emit("user disconnected", true);
    io.emit("active counter", users.length);
  });
});

server.listen(port, () => console.log(`server running on port ${port}`));

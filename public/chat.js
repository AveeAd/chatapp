function Redirect() {
  window.location = "/";
  socket.emit("disconnect");
}
if (!window.sessionStorage.name || !window.sessionStorage.room) {
  Redirect();
}
let socket = io();
let chatname = document.querySelector("#chatname");
let room = document.querySelector("#room");
let form = document.querySelector("#input");
let msg = document.querySelector("#msg");
let chatroom = document.querySelector("#chatroom");
let counter = document.querySelector("#counter");

room.innerText = window.sessionStorage.room;
chatname.innerText = window.sessionStorage.name;
socket.emit(
  "join room",
  window.sessionStorage.room,
  window.sessionStorage.name
);

socket.on("room joined", (msg) => {
  if (msg.joined) {
    let small = document.createElement("small");
    small.style.textAlign = "center";
    small.innerText = `${msg.name} joined the chat`;
    chatroom.appendChild(small);
  }
});

socket.on("active counter", (j) => {
  counter.innerText = `${j} active`;
});

socket.on("receive msg", function (msg) {
  let div = document.createElement("div");
  div.classList = "recvmsg";
  let h6 = document.createElement("h6");
  h6.style.fontStyle = "italic";
  let p = document.createElement("p");
  p.innerText = msg.msg;
  h6.innerText = msg.name;
  div.appendChild(h6);
  div.appendChild(p);
  chatroom.appendChild(div);
  chatroom.scrollTop = chatroom.scrollHeight;
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (msg.value) {
    let div = document.createElement("div");
    div.innerText = msg.value;
    div.classList = "sendmsg";
    chatroom.appendChild(div);
    chatroom.scrollTop = chatroom.scrollHeight;

    socket.emit("send message", {
      name: window.sessionStorage.name,
      msg: msg.value,
      room: window.sessionStorage.room,
    });
    msg.value = "";
  }
});

socket.on("user disconnected", (disconnected) => {
  if (disconnected) {
    let small = document.createElement("small");
    small.style.textAlign = "center";
    small.innerText = "someone left the chat";
    chatroom.appendChild(small);
  }
});

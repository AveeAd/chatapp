const root = document.querySelector("#root");
const name = document.querySelector("#name");
const room = document.querySelector("#room");
const enter = document.querySelector("#enter");
window.sessionStorage.clear();

const onEnter = (e) => {
  if (name.value) {
    if (room.value) {
      window.sessionStorage.room = room.value;
    }
    window.sessionStorage.name = name.value;
    window.location = "/chat";
  } else {
    errormsg = document.createElement("p");
    errormsg.innerText = "Please enter your name";
    errormsg.style.color = "red";

    root.appendChild(errormsg);
  }
};

enter.addEventListener("click", onEnter);

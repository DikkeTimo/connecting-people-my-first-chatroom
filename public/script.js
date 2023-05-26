let socket = io();
let messages = document.querySelector("section ul");
let input = document.querySelector("input");

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
});
socket.on("message", (message) => {
  addMessage(message);
});
socket.on("whatever", (message) => {
  addMessage(message);
});
socket.on("history", (history) => {
  history.forEach((message) => {
    addMessage(message);
  });
});

socket.emit("message", "Welkom op deze server");

socket.on("welcome", (message) => {
  const welcomeMessageElement = document.getElementById("welcome-message");
  welcomeMessageElement.innerHTML = message;
});

socket.on('idFromServer', (id) => {
  // Get the HTML element by its ID
  const myElement = document.getElementById('my-element');

  // Update the ID of the element
  myElement.id = id;
  console.log(myElement)
});

function addMessage(message) {
  messages.appendChild(
    Object.assign(document.createElement("li"), { textContent: message })
  );
  messages.scrollTop = messages.scrollHeight;
}

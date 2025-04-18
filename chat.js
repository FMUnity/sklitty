const socket = io();

// Raccogli il messaggio dall'input e invialo
document.getElementById('send-btn').addEventListener('click', () => {
  const message = document.getElementById('message').value;
  if (message) {
    socket.emit('chatMessage', message);
    document.getElementById('message').value = ''; // Resetta il campo
  }
});

// Ascolta i messaggi in arrivo e aggiungili alla chat
socket.on('chatMessage', (msg) => {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('p');
  messageElement.textContent = msg;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scorre fino all'ultimo messaggio
});

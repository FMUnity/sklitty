const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve i file statici dalla cartella 'public'
app.use(express.static('public'));

// Rotta di base
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Gestione connessione socket
io.on('connection', (socket) => {
  console.log('Un utente si è connesso');

  // Gestire quando un utente si unisce alla chat
  socket.on('join', (data) => {
    console.log(`Nuovo utente con ID ${data.userId} con colore ${data.userColor}`);
  });

  // Gestire la ricezione di messaggi
  socket.on('chat message', (message) => {
    // Invia il messaggio a tutti gli utenti connessi
    io.emit('chat message', message);
  });

  // Disconnessione
  socket.on('disconnect', () => {
    console.log('Un utente si è disconnesso');
  });
});

// Avvia il server sulla porta 3000
server.listen(3000, () => {
  console.log('Server in ascolto sulla porta 3000');
});

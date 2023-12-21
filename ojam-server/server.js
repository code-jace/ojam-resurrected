const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle list updates
  socket.on('updateList', (updatedList) => {
    io.emit('listUpdated', updatedList);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
    newMessage.createdAt = new Date().getTime();
    io.emit('newMessage', newMessage);
    //socket.broadcast.emit('newMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User is disconnected');
  });
});


server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
console.log(publicPath);

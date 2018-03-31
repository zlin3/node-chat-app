const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined'));

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);

    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
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

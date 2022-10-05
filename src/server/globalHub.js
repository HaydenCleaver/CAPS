'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

const server = new Server(PORT);

const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log(socket.id);


  socket.on('JOIN', (room) => {
    console.log(`${room} room connection established.`);
  });

  socket.on('PICKUP', (payload) => {
    globalLog('PICKUP', payload);
    caps.emit('PICKUP', payload);
  });

  socket.on('IN_TRANSIT', (payload) => {
    globalLog('IN_TRANSIT', payload);
    socket.emit('IN_TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    globalLog('DELIVERED', payload);
    socket.emit('DELIVERED', payload);
  });
  
});

function globalLog(event, payload){
  const date = new Date();
  const time = date.toTimeString();
  console.log('EVENT: ', {event, time, payload});
}

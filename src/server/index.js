'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const Queue = require('./lib/queue');
const server = new Server(PORT);

const caps = server.of('/caps');
const driverQueue = new Queue();
const vendorQueue = new Queue();

caps.on('connection', (socket) => {
  console.log(socket.id);


  socket.on('JOIN', (queueId) => {
    console.log(`${queueId} room connection established.`);
    socket.join(queueId);
    socket.emit('JOIN', queueId);
  });

  socket.on('PICKUP', (payload) => {
    let currentQueue = driverQueue.read(payload.queueId);
    console.log(payload.queueId);
    if(!currentQueue){
      let queueKey = driverQueue.store(payload.queueId, new Queue());
      currentQueue = driverQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);

    // socket.broadcast.emit('MESSAGE', payload);
    globalLog('PICKUP', payload);
    caps.emit('PICKUP', payload);
  });

  socket.on('IN_TRANSIT', (payload) => {
    globalLog('IN_TRANSIT', payload);
    socket.emit('IN_TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    console.log('Received Delivery message: ', payload);
    let currentQueue = vendorQueue.read(payload.queueId);
    if(!currentQueue){
      let queueKey = vendorQueue.store(payload.queueId, new Queue());
      currentQueue = vendorQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);

    // socket.broadcast.emit('MESSAGE', payload);
    globalLog('DELIVERED', payload);
    socket.broadcast.emit('DELIVERED', payload);
  });

  socket.on('RECEIVED', (payload) => {
    console.log('Received stored message:', payload);
    let currentDriverQueue = driverQueue.read(payload.queueId);
    let currentVendorQueue = vendorQueue.read(payload.queueId);
    if(!currentDriverQueue || !currentVendorQueue){
      throw new Error('no queue created');
    } else if (currentDriverQueue){
      let message = driverQueue.remove(payload.messageId);
      socket.to(payload.queueId).emit('RECEIVED', message);
    } else {
      let message = vendorQueue.remove(payload.messageId);
      socket.to(payload.queueId).emit('RECEIVED', message);
    }
  });

  socket.on('GETALL', (payload) => {
    console.log('Received queue request');
    let currentDriverQueue = driverQueue.read(payload.queueId);
    let currentVendorQueue = vendorQueue.read(payload.queueId);
    if(currentDriverQueue && currentDriverQueue.data){
      Object.keys(currentDriverQueue.data).forEach(messageId => {
        socket.emit('MESSAGE', currentDriverQueue.read(messageId));
      });
    }
    if(currentVendorQueue && currentVendorQueue.data){
      Object.keys(currentVendorQueue.data).forEach(messageId => {
        socket.emit('MESSAGE', currentVendorQueue.read(messageId));
      });
    }
  });
});

function globalLog(event, payload){
  const date = new Date();
  const time = date.toTimeString();
  console.log('EVENT: ', {event, time, payload});
}

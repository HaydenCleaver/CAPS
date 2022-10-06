'use strict';

const driverTransit = require('./driverTransit');
const driverDelivery = require('./driverDelivery');
const MessageClient = require('../lib/messageClient');
const driver = new MessageClient('caps');
const { io } = require('socket.io-client');

const socket = io('http://localhost:3001/caps');

const handleTransit = driverTransit(socket);
const handleDelivery = driverDelivery(socket);


driver.publish('GETALL', { queueId: 'caps'});

socket.on('PICKUP', (payload) => {
  handleTransit(payload);
});

// driver.subscribe('PICKUP', (payload) => {
//   console.log('received pickup request', payload);
//   handleTransit(payload);
//   driver.publish('RECEIVED', payload);
// });

socket.on('IN_TRANSIT', (payload) => {
  handleDelivery(payload);
});



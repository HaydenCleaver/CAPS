'use strict';

const { io } = require('socket.io-client');
const vendorLog = require('./vendorLog');
const vendorPickup = require('./vendorPickup');

const socket = io('http://localhost:3001/caps');

socket.on('PICKUP', vendorLog);
socket.on('DELIVERED', (payload) => {
  console.log(`Thank you for delivering ${payload.orderId}`);
  process.exit();
});

setInterval(() => {

  vendorPickup(socket);
}, 5000);

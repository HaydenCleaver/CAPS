'use strict';

const driverTransit = require('./driverTransit');
const driverDelivery = require('./driverDelivery');

const { io } = require('socket.io-client');

const socket = io('http://localhost:3001/caps');

const handleTransit = driverTransit(socket);
const handleDelivery = driverDelivery(socket);

socket.on('PICKUP', (payload) => {
  handleTransit(payload);
});

socket.on('IN_TRANSIT', (payload) => {
  handleDelivery(payload);
});



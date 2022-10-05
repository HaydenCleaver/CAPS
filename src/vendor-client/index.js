'use strict';

const { io } = require('socket.io-client');
const Chance = require('chance');
const vendorLog = require('./vendorLog');
const vendorConfirmation = require('./vendorConfirmation');

const socket = io('http://localhost:3001/caps');

const chance = new Chance();

socket.on('PICKUP', vendorLog);
socket.on('DELIVERED', vendorConfirmation);

setInterval(() => {

  let payload = {
    store: chance.company(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: `${chance.city()}, ${chance.state()}`,
  };

  socket.emit('JOIN', `${payload.store}`);

  console.log('-------transmitting new package---------');
  socket.emit('PICKUP', payload);
}, 5000);

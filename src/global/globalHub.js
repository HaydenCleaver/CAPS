'use strict';

const eventPool = require('./globalEventPool');

const {vendorOrder, vendorConfirmation} = require('../vendor/vendorHandler');
const driverHandler = require('../driver/driverHandler');
const { pickUp, inTransit, delivered } = require('./globalManager');

eventPool.on('NEW_ORDER', vendorOrder);
eventPool.on('PICKUP', pickUp);
eventPool.on('PICKUP', driverHandler);
eventPool.on('IN_TRANSIT', inTransit);
eventPool.on('DELIVERED', delivered);
eventPool.on('DELIVERED', vendorConfirmation);

setInterval(() =>{
  eventPool.emit('NEW_ORDER');
}, 12000);

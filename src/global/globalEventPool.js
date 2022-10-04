'use strict';

const Event = require('events');

const vendorHandler = require('../vendor/vendorHandler');
const driverHandler = require('../driver/driverHandler');
const globalManager = require('./globalManager');

const eventPool = new Event();

eventPool.on('PICKUP', globalManager);
eventPool.on('PICKUP', driverHandler);
eventPool.on('IN_TRANSIT', globalManager);
eventPool.on('DELIVERED', globalManager);
// eventPool.on('DELIVERED', vendorHandler);




module.exports = eventPool;

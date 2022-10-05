'use strict';

const eventPool = require('../global/globalEventPool');

module.exports = (payload) => {
  setTimeout(() => {

    console.log(`DRIVER: picked up ${payload.orderId}`);
    eventPool.emit('IN_TRANSIT', payload);
  }, 2000);

  setTimeout(() => {

    console.log(`DRIVER: delivered ${payload.orderId}`);
    eventPool.emit('DELIVERED', payload);
  }, 6000);
};

'use strict';

const Chance = require('chance');

const chance = new Chance();

function vendorPickup (socket) {
  let payload = {
    store: chance.company(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: `${chance.city()}, ${chance.state()}`,
  };

  socket.emit('JOIN', `${payload.store}`);
  console.log('-------transmitting new package---------');
  socket.emit('PICKUP', payload);
}

module.exports = vendorPickup;

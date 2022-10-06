'use strict';

module.exports = (socket) => (payload) => {

  console.log(`Picking up ${payload.orderId}`);
  // socket.emit('JOIN', `${payload.store}`);
  socket.emit('IN_TRANSIT', payload);

};

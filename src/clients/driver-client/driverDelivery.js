'use strict';

module.exports = (socket) => (payload) => {
  setTimeout(() => {
    console.log(`Delivered ${payload.orderId}`);
    // socket.emit('JOIN', `${payload.store}`);
    socket.emit('DELIVERED', payload);
  }, 3000);

};

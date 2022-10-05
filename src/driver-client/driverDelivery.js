'use strict';

module.exports = (socket) => (payload) => {
  setTimeout(() => {
    console.log(`Delivered ${payload.orderId}`);
    socket.emit('DELIVERED', payload);
  }, 2000);

};

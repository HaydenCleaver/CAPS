'use strict';

module.exports = (socket) => (payload) => {
  
  console.log(`Picking up ${payload.orderId}`);
  socket.emit('IN_TRANSIT', payload);

};

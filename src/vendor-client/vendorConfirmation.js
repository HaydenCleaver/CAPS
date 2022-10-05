'use strict';

module.exports = (socket) => (payload) => {
  console.log(`Thank you for delivering ${payload.orderId}`);
};

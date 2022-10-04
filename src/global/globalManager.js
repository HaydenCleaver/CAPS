'use strict';

const Chance = require ('chance');

const chance = new Chance();

module.exports = (payload) => {
  setTimeout(() => {
    let event = {
      time: chance.timestamp(),
    };

    console.log(event, payload);
  }, 1000);
};





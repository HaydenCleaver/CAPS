'use strict';

const Chance = require ('chance');

const chance = new Chance();

function logEvent(event, payload){
  const date = chance.date();
  const time = date.toDateString();
  console.log('EVENT: ', { event, time, payload});
}


function pickUp(payload){
  setTimeout(() => {
    logEvent('PICKUP', payload);
  }, 2000);
}

function inTransit(payload){
  setTimeout(() => {
    logEvent('IN_TRANSIT', payload);
  }, 2000);
}

function delivered(payload){
  setTimeout(() => {
    logEvent('DELIVERED', payload);
  }, 3000);
}

module.exports = {pickUp, inTransit, delivered};





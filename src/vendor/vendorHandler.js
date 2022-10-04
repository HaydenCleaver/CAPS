'use strict';

const eventPool = require('../global/globalEventPool');
const Chance = require('chance');

const chance = new Chance();

setInterval(() => {
    console.log('--------------------New Package!----------------------');

    let payload = {
        store: chance.company(),
        orderId: chance.guid(),
        customer: chance.name(),
        address: `${chance.city()}, ${chance.state()}`,
    };

    eventPool.emit('PICKUP', payload);
}, 7000);

// module.exports = (payload) => {
//     setTimeout(() => {
//         console.log(`Thank you, ${payload.name}`);
//     }, 2000);
// }

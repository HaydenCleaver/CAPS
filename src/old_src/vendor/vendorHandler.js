'use strict';

const eventPool = require('../global/globalEventPool');
const Chance = require('chance');

const chance = new Chance();

function vendorOrder () {

        setTimeout(() => {
        console.log('--------------------New Package!----------------------');

        let payload = {
            store: chance.company(),
            orderId: chance.guid(),
            customer: chance.name(),
            address: `${chance.city()}, ${chance.state()}`,
        };

        eventPool.emit('PICKUP', payload);
    }, 2000);
}

function vendorConfirmation(payload) {
        setTimeout(() => {
        console.log(`Thank you, ${payload.customer}`);
    }, 4000);
}

module.exports = { vendorOrder, vendorConfirmation };

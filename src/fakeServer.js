const SSEServer = require('sse-fake-server');

// Pass callback to SSEServer
var counter = 0;
var change = false;
var min=4;
var max=5;
var num_pets = Math.random() * (+1 - +3) + +min;
var interval = Math.random() * (+1000 - +30000) + +min;

var pets = {
    total_adopted: num_pets,
    dogs: ['Charlie', 'Betsy'],
    cats: ['Anna', 'Patches', 'Lulu'],
    birds: ['Polly']
};

SSEServer(client => {
    // Every 10 seconds send data to client
    setInterval(() => {
        client.id = counter;
        client.send(pets);
    }, interval);
});

const SSEServer = require('sse-fake-server');

// Pass callback to SSEServer
var counter = 0;
var change = false;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var num_pets = getRandomInt(1, 1000);

var oneSecond=1000;
var thirtySeconds=30000;
var interval = getRandomInt(oneSecond, thirtySeconds);

var pets = {
    total_adopted: num_pets,
    dogs: ['Charlie', 'Betsy'],
    cats: ['Anna', 'Patches', 'Lulu'],
    birds: ['Polly']
};

SSEServer(client => {
    setInterval(() => {
        client.id = counter;
        client.send(JSON.stringify(pets));
    }, interval);
});

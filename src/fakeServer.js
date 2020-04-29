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

let oneSecond=1000;
let thirtySeconds=30000;
let interval = getRandomInt(oneSecond, thirtySeconds);

let pets = {
    total_adopted: num_pets,
    dogs: ['Charlie', 'Betsy'],
    cats: ['Anna', 'Patches', 'Lulu', 'Diego'],
    birds: ['Polly']
};

SSEServer(client => {
    console.log(`interval is ${interval}`);

    setInterval(() => {
        pets.total_adopted += getRandomInt(1, 5);
        client.id = counter;
        client.send(JSON.stringify(pets));
    }, interval);
});

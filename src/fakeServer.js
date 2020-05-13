const WebSocket = require('ws');

const port = 3001;

const wss = new WebSocket.Server({
    port: port,
});

wss.on('open', () => {
    setInterval(() => {
        pets.total_adopted += getRandomInt(1, 5);
        console.log('in setInterval');
        ws.send(JSON.stringify(pets));
        wss.write(JSON.stringify(pets));
    }, interval);
});
wss.on('subscribe', (message) => {
    console.log(`Subscribing to ${message}`)
    wss.write(message);
});
wss.on('data', (message) => {
    console.log(`Data: ${message}`)
    wss.write(message);
});

console.log(` [*] Listening on 0.0.0.0:${port}`);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var num_pets = getRandomInt(1, 1000);
let oneSecond = 1000;
let thirtySeconds = 30000;
let interval = getRandomInt(oneSecond, thirtySeconds);
let pets = {
    total_adopted: num_pets,
    dogs: ['Charlie', 'Betsy'],
    cats: ['Anna', 'Patches', 'Lulu', 'Diego'],
    birds: ['Polly']
};

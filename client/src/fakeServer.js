const WebSocket = require('ws');

const port = 3001;

const ws = new WebSocket.Server({
    port: port,
});

ws.on('connection', (connection) => {
    setInterval(() => {
        pets.total_adopted += getRandomInt(1, 5);
        const petsText = JSON.stringify(pets);
        const message = `MESSAGE
subscription:0
message-id:${counter}
destination:/queue/a
content-type:text/plain
contnet-length:${petsText.length}

${petsText}^@`;

        counter+=1;

        /*const message = `MESSAGE
message-id:pets-${num_pets}
subscription:sub-1
destination:/topic/pets
content-type:application/json
ack:0000${num_pets}000petstopic0000
content-length: ${petsText.length}
        
${petsText}
        `;*/

        connection.send(message);
    }, interval);

    connection.on('error', (event) => {
        console.log(`error event: ${event}`);
    });

    connection.on('message', (message) => {
        connection.send(`got client message: ${message}`);
    });

    connection.on('send', (message) => {
        connection.send(`sending message: ${message}`);
    });

    connection.on('subscribe', (message, other) => {
        console.log(`Subscribing to ${message} ${other}`)
        ws.write(message);
    });
    connection.on('publish', (message) => {
        console.log(`Publishing ${message}`)
        ws.write(message);
    });
    connection.on('data', (message) => {
        console.log(`Data: ${message}`)
        ws.write(message);
    });
});

console.log(` [*] Listening on 0.0.0.0:${port}`);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let num_pets = getRandomInt(1, 1000);
let oneSecond = 1000;
let thirtySeconds = 30000;
let interval = getRandomInt(oneSecond, thirtySeconds);
let counter = 0;
let pets = {
    total_adopted: num_pets,
    dogs: ['Charlie', 'Betsy'],
    cats: ['Anna', 'Patches', 'Lulu', 'Diego'],
    birds: ['Polly']
};

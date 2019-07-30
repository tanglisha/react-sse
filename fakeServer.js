const SSEServer = require('sse-fake-server');

// Pass callback to SSEServer
var counter = 0;
var change = false;

SSEServer(client => {
    // Every 10 seconds send data to client
    setInterval(() => {
        client.id = counter;
        client.send('{"message": "Stream Hello! ' + counter + '"}');
        counter++;

    }, 10000);
});

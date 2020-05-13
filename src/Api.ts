import { RxStomp } from "@stomp/rx-stomp";

export interface PetData {
    total_adopted: number,
    dogs: string[],
    cats: string[],
    birds: string[],
};

const stompConfig = {
    // Typically login, passcode and vhost
    // Adjust these for your broker
    connectHeaders: {
        login: "guest",
        passcode: "guest"
    },

    // Broker URL, should start with ws:// or wss:// - adjust for your broker setup
    brokerURL: "ws://localhost:3001",

    // Keep it off for production, it can be quit verbose
    // Skip this key to disable
    debug: (str: string) => {
        console.log('STOMP: ' + str);
    },

    // If disconnected, it will retry after 200ms
    reconnectDelay: 200,
};

// Create an instance. The first RxStomp is the UMD module name and other is the class name
const rxStomp = new RxStomp();

// You can set additional configuration here
rxStomp.configure(stompConfig);

// Attempt to connect
rxStomp.activate();

// Watch will return an RxJS Observable which will yield messages for that end point.
// You can call all RxJS operations like map, filter, etc. on this
export const stream$ = (topic: string) => rxStomp.watch(`/topic/${topic}`);
export const petStream$ = stream$('pets');

rxStomp.publish({
    destination: '/topic/something',
    body: '{"some": "body"}',
})


rxStomp.publish({
    destination: '/topic/pets',
    body: '{"total_adopted": 8,' +
        '    "dogs": ["Charlie"],\n' +
        '    "cats": ["Max", "Sue"],\n' +
        '    "birds": ["Tweety"],}',
})
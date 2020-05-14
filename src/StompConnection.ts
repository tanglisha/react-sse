import { IRxStompPublishParams, RxStomp, RxStompConfig, RxStompState } from "@stomp/rx-stomp";
import { StompHeaders } from "@stomp/stompjs";

export class StompConnection {
    stompConfig = {
        /*connectHeaders: {
            login: "guest",
            passcode: "guest"
        },*/

        // Broker URL, should start with ws:// or wss:// - adjust for your broker setup
        brokerURL: "ws://localhost:3001",

        // Keep it off for production, it can be quit verbose
        // Comment out to disable
        debug: (str: string) => {
            console.log(`STOMP: ${str}`);
        },

        // If disconnected, it will retry after 200ms
        reconnectDelay: 200,
    } as RxStompConfig;

    // Create an instance. The first RxStomp is the UMD module name and other is the class name
    private rxStomp = new RxStomp();

    constructor() {
        // You can set additional configuration here
        this.rxStomp.configure(this.stompConfig);

        // Attempt to connect
        this.rxStomp.activate();
        this.rxStomp.unhandledReceipts$
            .subscribe(x => {
                console.log("unhandled receipt");
                console.log(x);
            })

        this.rxStomp.connected$
            .subscribe((x: RxStompState) => {
                console.log('activated?')
                console.log(x);
            })
    }

    subscribe$ = (destination: string, headers?: StompHeaders) =>
        this.rxStomp.watch(destination, headers);

    subscribeToTopic$ = (topic: string, headers?: StompHeaders) =>
        this.subscribe$(`topic/${topic}`, headers);

    publish$ = (parameters: IRxStompPublishParams) =>
        this.rxStomp.publish(parameters);
}
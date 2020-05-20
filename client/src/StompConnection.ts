import {IRxStompPublishParams, RxStomp, RxStompConfig} from "@stomp/rx-stomp/esm6";
import {StompHeaders} from "@stomp/stompjs";
import {Observable} from "rxjs";
import {pluck} from "rxjs/operators";

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
    public rxStomp = new RxStomp();

    constructor(real: boolean = true) {
        if (!real) { return; }
        // You can set additional configuration here
        this.rxStomp.configure(this.stompConfig);

        // Attempt to connect
        this.rxStomp.activate();

        /*this.rxStomp.publish({
            destination: '/topic/pets',
            body: 'pets body',
        } as IRxStompPublishParams)*/
    }

    subscribe$ = (destination: string, headers?: StompHeaders): Observable<any> =>
                this.rxStomp.watch(destination, headers)
                    .pipe(
                        pluck('body'), // we only want the body of this IMessage
                    );

    subscribeToTopic$ = (topic: string, headers?: StompHeaders): Observable<any> => {
        const finalHeaders = {...headers, id: '0'};
        return this.subscribe$(`/topic/${topic}`, finalHeaders);
    }

    publish$ = (parameters: IRxStompPublishParams) =>
        this.rxStomp.connected$.pipe().subscribe(() =>
            this.rxStomp.publish(parameters));
}
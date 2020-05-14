import { useSocketContext } from "./WebSocketContext";
import { Observable } from "rxjs";
import { IMessage } from "@stomp/stompjs";

export interface PetData {
    total_adopted: number,
    dogs: string[],
    cats: string[],
    birds: string[],
};

/*const {stompConnection} = useSocketContext();

stompConnection.publish$({
    destination: '/topic/something',
    headers: {'content-type': 'application/json'},
    body: '{"some": "body"}',
});

// Watch will return an RxJS Observable which will yield messages for that end point.
// You can call all RxJS operations like map, filter, etc. on this
export const topicStream$ = (topic: string) =>
    stompConnection.subscribeToTopic$(topic, {subscription: 'sub-1'});

export const petStream$: Observable<IMessage> = topicStream$('pets');


stompConnection.publish$({
    destination: '/topic/pets',
    body: JSON.stringify({
        "total_adopted": 8,
        "dogs": ["Charlie"],
        "cats": ["Max", "Sue"],
        "birds": ["Tweety"],
    }),
})*/
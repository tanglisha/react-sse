import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {PetData} from "./Api";
import {RxStomp, RxStompConfig} from "@stomp/rx-stomp/esm6";
import {IMessage} from "@stomp/stompjs";

export const Pets: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [pets, setPets] = useState<PetData>();
    // const {stompConnection} = useSocketContext();
    const stompConfig = {
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
    const rxStomp = new RxStomp();
    rxStomp.configure(stompConfig);
    rxStomp.activate();

    useEffect(() => {
        // const subscription = stompConnection.subscribeToTopic$('pets')
        //     .subscribe((payload: PetData) => {
        rxStomp
            .watch('/topic/pets', {id: '0'})
            .subscribe((payload: IMessage) => {
                console.log('got some data!');
                console.log(`payload: ${payload}`, payload);
                setLoading(true);
                setPets(JSON.parse(payload.body));
                setLoading(false);
            });
        /*
        // return () => subscription.unsubscribe();
         */
    }, [rxStomp]);

    const showAnimal = (animal: string[]) => {
        return animal.map(x => (<li>{x}</li>));
    };

    const showPetData = (petData: PetData) => {
        return (
            <div>
                <div>Already adopted: {Math.round(petData.total_adopted)}</div>
                <div>Cats still available</div>
                <ul>
                    {showAnimal(petData.cats)}
                </ul>
            </div>
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div>{loading || !pets ? 'Loading...' : showPetData(pets)}</div>
            </header>
        </div>
    );
};
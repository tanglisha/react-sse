import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PetData } from "./Api";
import { IMessage } from "@stomp/stompjs";
import { StompConnection } from "./StompConnection";
import { useSocketContext } from "./WebSocketContext";

export const rxStomp: StompConnection = new StompConnection();

export const Pets: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [pets, setPets] = useState<PetData>();
    const {stompConnection} = useSocketContext();

    useEffect(() => {
        const subscription = stompConnection.subscribeToTopic$('pets')
            .pipe()
            .subscribe((payload: IMessage) => {
                console.log('got some data!');
                console.log(payload);
                setLoading(true);
                const parsedData: PetData = JSON.parse(payload.body);
                setPets(parsedData);
                setLoading(false);
            });
        return () => subscription.unsubscribe();
    }, [stompConnection]);

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
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PetData, petStream$ } from "./Api";
import { IMessage } from "@stomp/stompjs";

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [pets, setPets] = useState<PetData>();

    useEffect(() => {
        const subscription = petStream$
            .subscribe((payload: IMessage) => {
                setLoading(true);
                const parsedData: PetData = JSON.parse(payload.body);
                setPets(parsedData);
                setLoading(false);
            });
        return () => subscription.unsubscribe();
    }, []);

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
}

export default App;

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Observable } from 'rxjs';

const App: React.FC = () => {
    type PetData = {
        total_adopted: number;
        cats: string[];
        dogs: string[];
        birds: string[];
    }

    const [loading, setLoading] = useState<boolean>(true);
    const [pets, setPets] = useState<PetData>();

    const observeMessages = (sseUrl: string): Observable<string> => {
        return new Observable<string>(obs => {
            const es = new EventSource(sseUrl);
            es.addEventListener('message', (evt) => {
                console.log(evt.data);
                obs.next(evt.data);
            });
            return () => es.close();
        });
    }
    useEffect(() => {
        const subscription = observeMessages('http://localhost:5555/stream')
            .subscribe((data:string) => {
                setLoading(true);
                const parsedData:PetData = JSON.parse(data);
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
                <div>Already adopted: { Math.round(petData.total_adopted) }</div>
                <div>Cats still available</div>
                <ul>
                    { showAnimal(petData.cats) }
                </ul>
            </div>
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                    <div>{ loading || !pets? 'Loading...': showPetData(pets) }</div>
            </header>
        </div>
    );
}

export default App;

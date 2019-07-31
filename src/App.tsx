import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Observable} from 'rxjs';

const App: React.FC = () => {
    type Pet = {
        num_adopted: number;
        cats: string[];
        dogs: string[];
        birds: string[];
    }

    const [loading, setLoading] = useState<boolean>(true);
    const [pets, setPets] = useState<Pet[]>();

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
    observeMessages('http://localhost:555/stream')
        .subscribe((data:string) => {
            const parsedData = JSON.parse(data);
            setPets(parsedData);
            setLoading(false);
        });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                    <div>{ loading? 'Loading...': pets }</div>
            </header>
        </div>
    );
}

export default App;

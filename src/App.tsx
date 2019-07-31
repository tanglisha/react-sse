import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import EventSource from 'event-source';

const App: React.FC = () => {
    const [message, setMessage] = useState();

    const es: EventSource = new EventSource('http://localhost:5555/stream');

    type MessageType = {
        data: {message: string},
    };

    es.onmessage = event => {
                            console.log(event.data);
                            setMessage(JSON.parse(event.data).message);
        es.close();
                        };

    es.addEventListener('open', function(e) {
        // Connection was opened.
    }, false);

    es.addEventListener('error', function(e) {
        // @ts-ignore
        if (e.readyState === EventSource.CLOSED) {
            // Connection was closed.
        }
    }, false);

    return (
        <div className="App">
            <header className="App-header">
                <div>{ message }</div>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;

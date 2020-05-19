import './wdyr';
import * as React from 'react';
import './App.css';
import { SocketContextProvider } from "./WebSocketContext";
import { Pets } from "./Pets";

const App: React.FC = () => {
    return (
        <SocketContextProvider>
            <Pets />
        </SocketContextProvider>
    );
};

export default App;

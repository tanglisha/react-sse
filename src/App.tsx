import './wdyr';
import * as React from 'react';
import './App.css';
import { StompConnection } from "./StompConnection";
import { SocketContextProvider } from "./WebSocketContext";
import { Pets } from "./Pets";

export const rxStomp: StompConnection = new StompConnection();

const App: React.FC = () => {
    return (
        <SocketContextProvider>
            <Pets />
        </SocketContextProvider>
    );
};

export default App;

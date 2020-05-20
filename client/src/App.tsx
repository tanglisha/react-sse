import './wdyr';
import * as React from 'react';
import './App.css';
import {Pets} from "./Pets";

const App: React.FC = () => {
    return (
        // <SocketContextProvider>
            <Pets />
        // </SocketContextProvider>
    );
};

export default App;

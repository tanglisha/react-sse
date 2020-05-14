import * as React from 'react';
import { Context, createContext, useContext, useState } from "react";
import { StompConnection } from "./StompConnection";

export interface WSContextType {
    stompConnection: StompConnection;
}

export const SocketContext: Context<WSContextType> = createContext<WSContextType>({
    stompConnection: new StompConnection()
});

export const useSocketContext = (): WSContextType => {
    return useContext(SocketContext);
};

interface WsInputProps {
    stompConnection?: StompConnection
}

export const SocketContextProvider: React.FC<WsInputProps> = ({stompConnection, children}) => {
    const [rxStomp, ] = useState<StompConnection>(stompConnection ?? new StompConnection());

    return (
        <SocketContext.Provider value={{
            stompConnection: rxStomp
        }}>
            {children}
        </SocketContext.Provider>
    );
}
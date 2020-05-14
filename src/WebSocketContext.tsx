import * as React from 'react';
import { Context, createContext, useContext } from "react";
import { StompConnection } from "./StompConnection";

export interface WSContextType {
    rxStomp: StompConnection;
}

export const SocketContext: Context<WSContextType> = createContext<WSContextType>({
    rxStomp: new StompConnection()
});

export const useSocketContext = (): WSContextType => {
    return useContext(SocketContext);
};

interface WsInputProps {
    stompConnection: StompConnection
}

export const SocketContextProvider: React.FC<WsInputProps> = ({stompConnection, children}) => {
    const rxStomp = stompConnection ?? new StompConnection();

    return (
        <SocketContext.Provider
            value={
            rxStomp: rxStomp
            }>
        {children}
        </SocketContext.Provider>,
    );
}
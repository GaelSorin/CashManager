// src/context/socketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextProps>({ socket: null, isConnected: false });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = io("ws://localhost:8001", {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log(`Connected to server with socket ID: ${newSocket.id}`);
            setIsConnected(true);
            newSocket.emit('new_clientId', newSocket.id);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Disconnected from server:', reason);
            setIsConnected(false);
        });

        newSocket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        newSocket.on('reconnect_attempt', (attempt) => {
            console.log(`Reconnection attempt ${attempt}`);
        });

        return () => {
            console.log('Disconnecting socket...');
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

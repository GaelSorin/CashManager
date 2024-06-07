import React, { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io("ws://localhost:8001", { transports: ['websocket'] });

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

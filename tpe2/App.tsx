// App.tsx
import React, { useEffect, useState } from 'react';
import { QRCode } from './pages/qrCodePage';
import { NativeRouter, Route, Routes } from "react-router-native";
import { Home } from './pages/home';
import { NFCReaderPage } from './pages/nfcPage';
import { AppState, AppStateStatus } from 'react-native';
import { TotalAmountProvider, useTotalAmount } from './context/totalAmountContext';
import { SocketProvider, useSocket } from './context/socketContext';

function App(): React.JSX.Element {
  const { setTotalAmount } = useTotalAmount();
  const socket = useSocket();
  const [clientID, setClientID] = useState<string>("");

  useEffect(() => {
    if (!socket) return;
  
    socket.on('connect', () => {
      console.log(`Connected to server with socket ID: ${socket.id}`);
      socket.emit('new_tpeId', socket.id);
    });
  
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  
    socket.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
    });
  
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        //console.log(`TPE ID : ${socket.id}`)
        //socket.emit('new_tpeId', socket.id); // Send the ID to the server
      } else if (nextAppState.match(/inactive|background/)) {
        //console.log("remove");
        //socket.emit('remove_tpeId');
      }
    };
  
    const subscription = AppState.addEventListener('change', handleAppStateChange);
  
    socket.on('getcheckout', (data) => {
      console.log("Received 'getcheckout' event:", data.totalAmount);
      console.log("client id : " + data.clientId)
      setClientID(data.clientId);
      setTotalAmount(data.totalAmount);
    });
  
    return () => {
      console.log("bye");
      subscription.remove();
      socket.disconnect();
    };
  }, [socket, setTotalAmount]);  

  return (
    <NativeRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/QRCode' element={<QRCode clientID={clientID} />} />
        <Route path='/NFC' element={<NFCReaderPage clientID={clientID}/>} />
      </Routes>
    </NativeRouter>
  );
}

export default () => (
  <SocketProvider>
    <TotalAmountProvider>
      <App />
    </TotalAmountProvider>
  </SocketProvider>
);

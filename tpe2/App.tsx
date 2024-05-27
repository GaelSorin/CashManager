import React, { useEffect, useState } from 'react';
import { QRCode } from './pages/qrCodePage';
import { NativeRouter, Route, Routes } from "react-router-native";
import { Home } from './pages/home';
import { NFCReaderPage } from './pages/nfcPage';
import { io } from 'socket.io-client';
import { AppState, AppStateStatus } from 'react-native';

const socket = io("ws://localhost:8001", {transports: ['websocket']});

function App(): React.JSX.Element {
  const [totalAmount, setTotalAmount] = useState(0);

  socket.on('connect', () => {
    console.log(`Connected to server with socket ID: ${socket.id}`);
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

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        const id = Math.random().toString(36).substr(2, 9);
        console.log("generated id : " + id);
        socket.emit('new_tpeId', id);
      } else if (nextAppState.match(/inactive|background/)) {
        console.log("remove");
        socket.emit('remove_tpeId');
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    socket.on('getcheckout', (data) => {
      console.log("Received 'getcheckout' event:", data);
      setTotalAmount(data.totalAmount);
    });

    return () => {
      console.log("bye");
      subscription.remove();
      socket.disconnect();
    };
  }, [socket]);

  return (
    <NativeRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/QRCode' element={<QRCode finishPayement={function (id: string): void {}} />} />
        <Route path='/NFC' element={<NFCReaderPage />} />
      </Routes>
    </NativeRouter>
  );
}

export default App;

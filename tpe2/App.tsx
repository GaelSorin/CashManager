import React, { useEffect } from 'react';
import { QRCode } from './pages/qrCodePage';
import { NativeRouter, Route, Routes } from "react-router-native";
import { Home } from './pages/home';
import { NFCReaderPage } from './pages/nfcPage';
import { io } from 'socket.io-client';

function App(): React.JSX.Element {
  useEffect(() => {
    const socket = io("http://localhost:3001"); // URL de votre serveur socket.io

    // receive message from server
    socket.on("hello", (arg: string) => {
      console.log(arg);
    });

    // send a message to the server
    socket.emit("howdy", "stranger");

    return () => {
      socket.disconnect();
    };
  }, []);

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

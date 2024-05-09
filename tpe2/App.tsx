import React from 'react';
import { QRCode } from './components/camera';
import { NativeRouter, Route, Router, Routes } from "react-router-native";
import { Home } from './pages/home';
//import { NFCReaderPage } from './pages/nfcPage';

function App(): React.JSX.Element {

  return (
    <NativeRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/QRCode' element={<QRCode finishPayement={function (id: string): void {} }/>}/>
          </Routes>
    </NativeRouter>
  );
}

export default App;

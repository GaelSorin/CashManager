// src/App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart';
import { ShopContextProvider } from './context/shop-context';
import { Login } from './pages/login/login';
import { info } from './stores/authentification';
import { SocketProvider } from './context/socketContext';

function App() {
  const [navbarDisplay, setNavbarDisplay] = useState<boolean>(false);

  // Vérifie si connecté
  const getInfos = async () => {
    const result = await info();
    if (result.status !== "ok" && window.location.pathname !== "/") {
      window.location.href = "/";
    } else if (result.status === "ok" && window.location.pathname === "/") {
      window.location.href = "/shop";
    }
  };
  getInfos();

  return (
    <div className="App">
      <ShopContextProvider>
        <SocketProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/shop' element={<Shop />}/>
              <Route path='/cart' element={<Cart />}/>
            </Routes>
          </Router>
        </SocketProvider>
      </ShopContextProvider>
    </div>
  );
}

export default App;

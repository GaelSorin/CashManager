import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./login.css"

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Mettez ici votre logique de gestion de la connexion
    console.log('Connexion avec :', username, password);
  };
    return <div className="login-container">
    <h1 className="login-header">Connect To Pirate Emporium</h1>
    <form onSubmit={handleLogin}>
      <div className="login-input">
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="login-input">
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button"><Link to={"/shop"}>Connect</Link></button>
    </form>
  </div>
}
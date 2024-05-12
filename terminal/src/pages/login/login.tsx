import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./login.css"
import { login } from "../../stores/authentification";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const result = await login(username, password);
            if (result.status === "ok") {
              window.location.href = "/shop";
            } else {
              console.log("Erreur lors du login")
            }
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
      <button type="submit" className="login-button" onClick={handleLogin}>Connect</button>
    </form>
  </div>
}
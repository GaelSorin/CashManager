// src/pages/login/login.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../stores/authentification";
import { useSocket } from "../../context/socketContext";
import "./login.css";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { socket, isConnected } = useSocket();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await login(username, password);
        if (result.status === "ok") {
            // Wait until the socket is connected
            if (isConnected) {
                navigate("/shop");
            } else {
                setError("Socket connection failed. Please try again.");
            }
        } else {
            setError("Erreur lors du login");
        }
    };

    useEffect(() => {
        if (isConnected && error) {
            setError('');
            navigate("/shop");
        }
    }, [isConnected, error, navigate]);

    return (
        <div className="login-container">
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
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="login-button">Connect</button>
            </form>
        </div>
    );
};

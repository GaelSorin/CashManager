import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
import { logout } from "../stores/authentification";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div className="navbar">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <div className="links">
                <Link to={"/shop"}>Shop</Link>
                <Link to={"/cart"}><ShoppingCart size={32} /></Link>
            </div>
        </div>
    );
};

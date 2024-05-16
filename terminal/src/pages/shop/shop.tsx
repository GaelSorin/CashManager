import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css"
import Cookies from "js-cookie"
import { Navbar } from '../../components/navbar';
import { info } from "../../stores/authentification";

export const Shop = () => {
    
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
    
    const tokenExists = document.cookie.split(';').some((item) => item.trim().startsWith('token='));
    console.log(tokenExists);
    // Si le cookie "token" n'existe pas, rediriger vers la page "/"
    /*if (!tokenExists) {
        window.location.href = "/";
        return null; // Arrêter le rendu du composant
    }*/

    /*if (Cookies.get('token') == null) {
        window.location.href = "/";
    }*/

    return <div className="shop">
        <Navbar/>
        <div className="shopTitle">
            <h1>Pirate Emporium</h1>
        </div>
        <div className="products">
            {PRODUCTS.map((product)=> (
            <Product data={product}/>
            ))}
        </div>
    </div>;
}
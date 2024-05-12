import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css"
import Cookies from "js-cookie"

export const Shop = () => {
    
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
import React from "react";
import { PORDUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css"

export const Shop = () => {
    return <div className="shop">
        <div className="shopTitle">
            <h1>Pirate Emporium</h1>
        </div>
        <div className="products">
            {PORDUCTS.map((product)=> (
            <Product data={product}/>
            ))}
        </div>
    </div>;
}
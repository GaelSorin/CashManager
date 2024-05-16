import React, { useContext } from "react";
import { PRODUCTS } from "../../products";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import './cart.css';
import { useNavigate } from "react-router-dom";
import { info } from "../../stores/authentification";
import { Navbar } from "../../components/navbar";

export const Cart = () => {
    const {cartItems, getTotalCartAmount} = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();


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

    return <div className="cart">
        <Navbar/>
        <div> 
            <h1> Your Cart Items</h1>
        </div>
        <div className="cartItems">
            {PRODUCTS.map((product) => {
                if(cartItems[product.id] !== 0){
                    return <CartItem data={product} />;
                }
            })}
        </div>
        {totalAmount > 0 ?
        <div className="checkout">
            <p>Subtotal: {totalAmount} €</p>
            <button onClick={ () => navigate("/shop")}> Continue Shopping </button>
            <button> Checkout </button>
        </div>
        : <h1> Your cart is Empty</h1>}
    </div>;
}
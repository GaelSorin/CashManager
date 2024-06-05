// src/pages/cart/cart.tsx
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import './cart.css';
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { Item as ItemType } from "../../models/item";
import { getAllItems } from "../../stores/items";
import { useSocket } from "../../context/socketContext";

export const Cart = () => {
    const { cartItems, clearCart } = useContext(ShopContext);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const navigate = useNavigate();
    const [items, setItems] = useState<ItemType[]>([]);
    const { socket, isConnected } = useSocket();

    const getItems = async () => {
        const result = await getAllItems();
        if (result.status === "ok") {
            setItems(result.data as ItemType[]);
        }
    };

    useEffect(() => {
        let temp = 0;
        items.forEach(item => {
            if (cartItems[item.id] !== undefined) {
                temp += (item.price * cartItems[item.id]);
            }
        });
        setTotalAmount(temp);
    }, [items, cartItems]);

    useEffect(() => {
        getItems();
    }, []);

    const onCheckout = () => {
        if (socket && isConnected) {
            console.log("Subtotal: " + totalAmount);
            console.log(socket);
            socket.emit("checkout", { totalAmount });
        } else {
            console.error("Socket is not connected");
        }
    };

    return (
        <div className="cart">
            <Navbar />
            <div>
                <h1>Your Cart Items</h1>
            </div>
            <div className="cartItems">
                {items.map((item) => {
                    if (cartItems[item.id] !== undefined) {
                        return <CartItem key={item.id} data={item} />;
                    }
                })}
            </div>
            {totalAmount > 0 ? (
                <div className="checkout">
                    <p>Subtotal: {totalAmount} €</p>
                    <button onClick={() => navigate("/shop")}>Continue Shopping</button>
                    <button onClick={onCheckout}>Checkout</button>
                    <button onClick={clearCart}>Clear Cart</button>
                </div>
            ) : (
                <h1>Your cart is Empty</h1>
            )}
        </div>
    );
};

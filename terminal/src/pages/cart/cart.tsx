import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import './cart.css';
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { Item as ItemType } from "../../models/item";
import { getAllItems } from "../../stores/items";
import { Server, Socket } from "socket.io";

export const Cart = () => {
    const {cartItems} = useContext(ShopContext);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const navigate = useNavigate();
    const [items, setItems] = useState<ItemType[]>([]);

    const getItems = async () =>{
        const result = await getAllItems();
        if (result.status === "ok") {
            setItems(result.data as ItemType[]);
        }
    }

    /*const io = new Server(3000);
    io.on("connection", (socket) => {
        //send message
        socket.emit("hello", "world");

        // receive message
        socket.on("howdy", (arg)=> {
            console.log(arg);
        })
    });*/

    //Total de la somme
    useEffect(() => {
        let temp = 0;
        items.forEach(item => {
            if(cartItems[item.id] !== undefined){
                temp += (item.price * cartItems[item.id]);
            }
            
        });
        setTotalAmount(temp)
    }, [items, cartItems])

    // Récupération des articles
    useEffect(() => {
        getItems();
    }, []);

    const onCheckout = async () =>{
        console.log("Subtotal" + totalAmount);
    }
    

    return <div className="cart">
        <Navbar/>
        <div> 
            <h1> Your Cart Items</h1>
        </div>
        <div className="cartItems">
            {items.map((item) => {
                if(cartItems[item.id] !== undefined){
                    return <CartItem data={item} />;
                }
            })}
        </div>
        {totalAmount > 0 ?
        <div className="checkout">
            <p>Subtotal: {totalAmount} €</p>
            <button onClick={ () => navigate("/shop")}> Continue Shopping </button>
            <button onClick={ onCheckout}> Checkout </button>
        </div>
        : <h1> Your cart is Empty</h1>}
    </div>;
}
import React, { useEffect, useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css"
import { Navbar } from '../../components/navbar';
import { info } from "../../stores/authentification";
import { getAllItems } from "../../stores/items";
import { Item as ItemType, ItemListWithQuantity } from "../../models/item";

export const Shop = () => {
    const [items, setItems] = useState<ItemType[]>([]);
    
    const getItems = async () =>{
        const result = await getAllItems();
        if (result.status === "ok") {
            setItems(result.data as ItemType[]);
        }
    }

    useEffect(() => {
        getItems();
    }, []);

    return <div className="shop">
        <Navbar/>
        <div className="shopTitle">
            <h1>Pirate Emporium</h1>
        </div>
        <div className="products">
            {items.map((item)=> (
            <Product data={item}/>
            ))}
        </div>
    </div>;
}
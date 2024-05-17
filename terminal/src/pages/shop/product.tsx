import React, { useContext, useEffect } from "react";
import { ShopContext , CartItems } from "../../context/shop-context";
export const Product: React.FC<{ data: { id: any; name: any; price: any; image: any; }; }> = ({ data }) => {    
    const { id, name, price, image } = data;
    
    // Add to cart
    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemAmount = cartItems[id];

    return( 
        <div className="product">
            <img src={image} alt={name} />
            <div className="description">
                <p>
                    <b>{name}</b>
                </p>
                <p>{price} €</p>
            </div>
            <button className="addToCartBtn" onClick={() => addToCart(id)}> 
                Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
            </button>
        </div>
    );
};

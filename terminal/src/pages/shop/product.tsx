import React, { useContext, useEffect } from "react";
import { ShopContext , CartItems } from "../../context/shop-context";
export const Product: React.FC<{ data: { id: any; productName: any; price: any; productImage: any; }; }> = ({ data }) => {    
    const { id, productName, price, productImage } = data;
    
    // Add to cart
    const { addToCart, cartItems } = useContext(ShopContext);
    const cartItemAmount = cartItems[id]

    return( 
        <div className="product">
            <img src={productImage} alt={productName} />
            <div className="description">
                <p>
                    <b>{productName}</b>
                </p>
                <p>{price} €</p>
            </div>
            <button className="addToCartBtn" onClick={() => addToCart(id)}> 
                Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
            </button>
        </div>
    );
};

import React from "react";

export const Product = (props: { data: { id: any; productName: any; price: any; productImage: any; }; }) => {
    const {id, productName, price, productImage} = props.data ;
    return( 
    <div className="product">
        <img src={productImage} />
        <div className="description">
            <p>
                <b>{productName}</b>
            </p>
            <p>{price} €</p>
        </div>
        <button className="addToCartBtn"> Add To Cart</button>
    </div>)
}
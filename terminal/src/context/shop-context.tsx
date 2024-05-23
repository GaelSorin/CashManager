import React, { createContext, useState } from "react";
import { PRODUCTS } from "../products";

// Define the type for cart items
export interface CartItems {
  [key: string]: number;
}

// Define the type for the shop context
interface ShopContextType {
  cartItems: CartItems;
  addToCart: (itemId: number) => void;
  updateCartItemCount: (newAmount: number, itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  checkout: () => void;
  clearCart: () => void;
}

const defaultShopContext: ShopContextType = {
  cartItems: {},
  addToCart: (_: number) => {},
  updateCartItemCount: (_: number, itemId: number) => {},
  removeFromCart: (_: number) => {},
  checkout: () => {},
  clearCart: () => {},
}

// Create the context
export const ShopContext = createContext<ShopContextType>(defaultShopContext);

// Define the props for the ShopContextProvider
interface ShopContextProviderProps {
  children: React.ReactNode;
}

// ShopContextProvider component
export const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems>(getDefaultCart());

  // Function to get the default cart
  function getDefaultCart(): CartItems {
    const cart: CartItems = {};
    for (const product of PRODUCTS) {
      cart[product.id] = 0;
    }
    return cart;
  }

  const addToCart = (itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
  };

  const updateCartItemCount = (newAmount: number, itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const clearCart = () => {
    setCartItems({});
  };

  const contextValue: ShopContextType = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    checkout,
    clearCart,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

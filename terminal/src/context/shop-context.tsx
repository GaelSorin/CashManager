import React, { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";

// Définir le type pour les éléments du panier
export interface CartItems {
  [key: number]: number;
}

// Interface pour les informations sur un produit
interface Product {
  id: number;
  price: number;
}

// Définir le type pour le contexte
interface ShopContextType {
  cartItems: CartItems;
  addToCart: (itemId: number) => void;
  updateCartItemCount: (newAmount: number, itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  checkout: () => void;
}

const defaultShopContext: ShopContextType = {
    cartItems: {},
    addToCart: (_: number) => {},
    updateCartItemCount: (_: number, itemId: number) => {},
    removeFromCart: (_: number) => {},
    checkout: () => {}

}

// Créer le contexte
export const ShopContext = createContext<ShopContextType>(defaultShopContext);

// Interface pour les propriétés passées au composant ShopContextProvider
interface ShopContextProviderProps {
  children: React.ReactNode;
}

// Composant ShopContextProvider
export const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems>(getDefaultCart());

  // Fonction pour obtenir le panier par défaut
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

  const contextValue: ShopContextType = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    checkout,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

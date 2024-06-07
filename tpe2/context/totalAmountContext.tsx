// TotalAmountContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TotalAmountContextType {
  totalAmount: number;
  setTotalAmount: (amount: number) => void;
  resetTotalAmount: () => void;  // Ajout de la fonction reset
}

const TotalAmountContext = createContext<TotalAmountContextType | undefined>(undefined);

interface TotalAmountProviderProps {
  children: ReactNode;
}

export const TotalAmountProvider: React.FC<TotalAmountProviderProps> = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  const resetTotalAmount = () => {
    setTotalAmount(0);
  };

  return (
    <TotalAmountContext.Provider value={{ totalAmount, setTotalAmount, resetTotalAmount }}>
      {children}
    </TotalAmountContext.Provider>
  );
};

export const useTotalAmount = () => {
  const context = useContext(TotalAmountContext);
  if (!context) {
    throw new Error('useTotalAmount must be used within a TotalAmountProvider');
  }
  return context;
};

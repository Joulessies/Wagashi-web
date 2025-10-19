"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ProductDetailsContextType = {
  selectedProductId: number | null;
  isModalOpen: boolean;
  openProductDetails: (productId: number) => void;
  closeProductDetails: () => void;
};

const ProductDetailsContext = createContext<ProductDetailsContextType | undefined>(undefined);

export function ProductDetailsProvider({ children }: { children: ReactNode }) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProductDetails = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeProductDetails = () => {
    setSelectedProductId(null);
    setIsModalOpen(false);
  };

  return (
    <ProductDetailsContext.Provider
      value={{
        selectedProductId,
        isModalOpen,
        openProductDetails,
        closeProductDetails,
      }}
    >
      {children}
    </ProductDetailsContext.Provider>
  );
}

export function useProductDetails() {
  const context = useContext(ProductDetailsContext);
  if (context === undefined) {
    throw new Error("useProductDetails must be used within a ProductDetailsProvider");
  }
  return context;
}

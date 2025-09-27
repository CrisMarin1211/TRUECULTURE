import { useContext, useState, createContext } from 'react';
import type { ProductItem, ProductProviderProps, ProductContextType } from '../types/ProductType';
import { mockProducts } from '../data/mockProducts';

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<ProductItem[]>(mockProducts);

  const addProduct: ProductContextType['addProduct'] = (product) => {
    const newProduct: ProductItem = { id: crypto.randomUUID(), ...product };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateStock: ProductContextType['updateStock'] = (id, stockTaken) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, availableStock: prod.availableStock - stockTaken } : prod,
      ),
    );
  };

  const editProduct: ProductContextType['editProduct'] = (id, updates) => {
    setProducts((prev) => prev.map((prod) => (prod.id === id ? { ...prod, ...updates } : prod)));
  };

  const removeProduct: ProductContextType['removeProduct'] = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const saveProduct: ProductContextType['saveProduct'] = (product) => {
    const newProduct: ProductItem = { id: crypto.randomUUID(), ...product, isDraft: true };
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateStock, editProduct, removeProduct, saveProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct debe usarse dentro de un ProductProvider');
  }
  return context;
};

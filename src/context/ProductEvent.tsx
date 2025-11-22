import { useContext, useState, useEffect, createContext } from 'react';
import type { ProductItem, ProductProviderProps, ProductContextType } from '../types/ProductType';
import {
  getProducts,
  addProduct as addProductService,
  updateProduct,
  deleteProduct,
} from '../services/products';

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const addProduct: ProductContextType['addProduct'] = async (product) => {
    const data = await addProductService(product);
    if (data) {
      setProducts((prev) => [data[0], ...prev]);
    }
  };

  const updateStock: ProductContextType['updateStock'] = async (id, stockTaken) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, availablestock: prod.availablestock - stockTaken } : prod,
      ),
    );

    const current = products.find((p) => p.id === id);
    if (current) {
      const newAvailable = current.availablestock - stockTaken;
      await updateProduct(id, { availablestock: newAvailable });
    }
  };

  const editProduct: ProductContextType['editProduct'] = async (id, updates) => {
    const data = await updateProduct(id, updates);
    if (data) {
      setProducts((prev) => prev.map((prod) => (prod.id === id ? { ...prod, ...updates } : prod)));
    }
  };

  const removeProduct: ProductContextType['removeProduct'] = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const saveProduct: ProductContextType['saveProduct'] = async (product) => {
    const draft = { ...product, isdraft: true };
    const data = await addProductService(draft);
    if (data) {
      setProducts((prev) => [data[0], ...prev]);
    }
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

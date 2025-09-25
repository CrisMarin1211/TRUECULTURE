export interface ProductItem {
  id: string;
  image: string;
  imageFile?: File | null;
  name: string;
  Stock: number;
  Status: 'Activo' | 'No activo';
  location: string;
  description: string;
  price: number;
  totalStock: number;
  availableStock: number;
  popularity: 'Alta demanda' | 'Media demanda' | 'Baja demanda';
  tags: string[];
  UnitsSaled: number;
  isDraft?: boolean;
}

export interface ProductProviderProps {
  children: React.ReactNode;
}

export interface ProductContextType {
  products: ProductItem[];
  addProduct: (Product: Omit<ProductItem, 'id'>) => void;
  updateStock: (id: string, stockTaken: number) => void;
  editProduct: (id: string, updates: Partial<ProductItem>) => void;
  removeProduct: (id: string) => void;
  saveProduct: (Product: Omit<ProductItem, 'id'>) => void;
}

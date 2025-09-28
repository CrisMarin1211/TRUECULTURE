export interface ProductItem {
  id: string;
  image: string;
  imageFile?: File | null;
  name: string;
  Stock: number;
  Status: 'Activo' | 'No activo';
  location: string;
  address: string;
  city: 'Cali, Colombia' | 'Bogotá, Colombia';
  description: string;
  price: number;
  totalStock: number;
  availableStock: number;
  popularity: 'Alta demanda' | 'Media demanda' | 'Baja demanda';
  tags: 'Afiches' | 'Pines' | 'Cultural' | 'Moda' | 'Gastronomía';
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

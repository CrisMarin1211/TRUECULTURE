export interface ProductItem {
  id: string;
  image: string;
  imageFile?: File | null;
  name: string;
  stock: number;
  status: 'Activo' | 'No activo';
  location: string;
  address?: string;
  city: 'Cali, Colombia' | 'Bogotá, Colombia';
  description: string;
  price: number;
  totalstock: number;
  availablestock: number;
  popularity: 'Alta demanda' | 'Media demanda' | 'Baja demanda';
  tags: 'Afiches' | 'Pines' | 'Cultural' | 'Moda' | 'Gastronomía';
  unitssaled: number;
  isdraft?: boolean;
}

export interface ProductProviderProps {
  children: React.ReactNode;
}

export interface ProductContextType {
  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  updateStock: (id: string, stockTaken: number) => void;
  editProduct: (id: string, updates: Partial<ProductItem>) => void;
  removeProduct: (id: string) => void;
  saveProduct: (product: Omit<ProductItem, 'id'>) => void;
}

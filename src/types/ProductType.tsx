export interface ProductItem {
  id?: number;
  image: string;
  imagefile?: File | null;
  name: string;
  price: number;
  description: string;
  location: string;
  address?: string;
  city?: 'Cali, Colombia' | 'Bogotá, Colombia';
  totalstock: number;
  availablestock: number;
  unitssaled: number;
  popularity?: 'Alta demanda' | 'Media demanda' | 'Baja demanda';
  tags?: 'Afiches' | 'Pines' | 'Cultural' | 'Moda' | 'Gastronomía';
  status: 'Activo' | 'No activo';
  isdraft?: boolean;
  organization?: string;
}

export const defaultProduct: ProductItem = {
  image: '',
  imagefile: null,
  name: '',
  description: '',
  location: '',
  address: '',
  city: undefined,
  price: 0,
  totalstock: 0,
  availablestock: 0,
  unitssaled: 0,
  popularity: undefined,
  tags: undefined,
  status: 'Activo',
  isdraft: false,
};

export interface ProductProviderProps {
  children: React.ReactNode;
}

export interface ProductContextType {
  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, 'id'>) => Promise<void>;
  editProduct: (id: number, updates: Partial<ProductItem>) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
  updateStock: (id: number, stockTaken: number) => Promise<void>;
  saveProduct: (product: Omit<ProductItem, 'id'>) => Promise<void>;
}

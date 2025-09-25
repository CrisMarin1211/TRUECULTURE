export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, 'id'> & { id?: string }) => void;
  signup: (userData: Omit<User, 'id'>) => void;
  logout: () => void;
}

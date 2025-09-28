import { createContext, useContext, useState } from 'react';
import type { User, AuthProviderProps, AuthContextType } from '../types/UserType';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Simulación de login (en una app real, aquí llamas a tu API)
  const login: AuthContextType['login'] = (userData) => {
    const userWithId: User = { id: userData.id || crypto.randomUUID(), ...userData };
    setUser(userWithId);
  };

  // Simulación de sign up (en una app real, aquí llamas a tu API)
  const signup: AuthContextType['signup'] = (userData) => {
    const newUser: User = { id: crypto.randomUUID(), ...userData };
    setUser(newUser);
  };

  const logout: AuthContextType['logout'] = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

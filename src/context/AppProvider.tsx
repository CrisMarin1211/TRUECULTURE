import { type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import { CityProvider } from './CityContext';
import { ProductProvider } from './ProductEvent';
import { EventProvider } from './EventContext';
import { CartProvider } from './CartContex';
import { AuthProvider, useAuth } from './AuthContext';

interface AppProviderProps {
  children: ReactNode;
}

const CartWrapper = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  return <CartProvider userId={userId}>{children}</CartProvider>;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CityProvider>
          <ProductProvider>
            <EventProvider>
              <CartWrapper>{children}</CartWrapper>
            </EventProvider>
          </ProductProvider>
        </CityProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
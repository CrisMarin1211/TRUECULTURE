import { type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import { CityProvider } from './CityContext';
import { ProductProvider } from './ProductEvent';
import { EventProvider } from './EventContext';
import { CartProvider } from './CartContex';
import { AuthProvider } from './AuthContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CityProvider>
          <ProductProvider>
            <EventProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </EventProvider>
          </ProductProvider>
        </CityProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

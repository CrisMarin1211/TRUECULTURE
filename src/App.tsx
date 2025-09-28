import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductEvent';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <AppRoutes />
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

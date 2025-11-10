import { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AppRoutes from './routes';
import { supabase } from './lib/supabaseClient';

// Componente wrapper para manejar OAuth dentro del Router
const OAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar inmediatamente si hay un hash de OAuth y sesión activa
    const checkOAuthCallback = async () => {
      const hasOAuthHash = window.location.hash.includes('access_token');
      
      if (hasOAuthHash) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            // Limpiar el hash de la URL
            window.history.replaceState(null, '', window.location.pathname);
            // Redirigir al dashboard
            navigate('/DashboardClient', { replace: true });
          }
        } catch (error) {
          console.error('Error al verificar sesión OAuth:', error);
        }
      }
    };

    checkOAuthCallback();

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Si el usuario se autentica y hay hash de OAuth en la URL, redirigir
      if (event === 'SIGNED_IN' && session) {
        const hasOAuthHash = window.location.hash.includes('access_token');
        if (hasOAuthHash) {
          // Limpiar el hash de la URL
          window.history.replaceState(null, '', window.location.pathname);
          // Redirigir al dashboard
          navigate('/DashboardClient', { replace: true });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return null;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <OAuthHandler />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;

import { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AppRoutes from './routes';
import { supabase } from './lib/supabaseClient';
import { Analytics } from "@vercel/analytics/react";


const OAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const checkOAuthCallback = async () => {
      const hasOAuthHash = window.location.hash.includes('access_token');

      if (hasOAuthHash) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {

            window.history.replaceState(null, '', window.location.pathname);

            navigate('/DashboardClient', { replace: true });
          }
        } catch (error) {
          console.error('Error al verificar sesión OAuth:', error);
        }
      }
    };

    checkOAuthCallback();


    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {

      if (event === 'SIGNED_IN' && session) {
        const hasOAuthHash = window.location.hash.includes('access_token');
        if (hasOAuthHash) {

          window.history.replaceState(null, '', window.location.pathname);

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
        <Analytics />
      </BrowserRouter>
    </>
  );
}

export default App;

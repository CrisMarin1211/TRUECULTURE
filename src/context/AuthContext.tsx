import { createContext, useContext, useEffect, useState } from 'react';
<<<<<<< HEAD

=======
import { supabase } from '../lib/supabaseClient';
import { createUserProfile } from '../services/users';
import type {
  AuthProviderProps,
  AuthContextType,
  AppUser,
  LoginCredentials,
  SignupCredentials,
} from '../types/UserType';
>>>>>>> origin/staging
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapSupabaseUserToAppUser = (user: SupabaseUser): AppUser => ({
  id: user.id,
  email: user.email ?? '',
  name: user.user_metadata?.full_name ?? '',
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
=======
  const setUserAndPersist = (supabaseUser: SupabaseUser | null) => {
    if (supabaseUser) {
      const appUser = mapSupabaseUserToAppUser(supabaseUser);
      setUser(appUser);
      localStorage.setItem('user_id', appUser.id);
    } else {
      setUser(null);
      localStorage.removeItem('user_id');
    }
  };

>>>>>>> origin/staging
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error(error);

      if (data.session?.user) {
<<<<<<< HEAD
        setUser(mapSupabaseUserToAppUser(data.session.user));
      } else {
        setUser(null);
=======
        setUserAndPersist(data.session.user);
      } else {
        setUserAndPersist(null);
>>>>>>> origin/staging
      }

      setLoading(false);
    };
    getSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
<<<<<<< HEAD
      if (session?.user) {
        setUser(mapSupabaseUserToAppUser(session.user));
      } else {
        setUser(null);
      }
=======
      setUserAndPersist(session?.user ?? null);
>>>>>>> origin/staging
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signup = async ({ email, password, name }: SignupCredentials): Promise<void> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
<<<<<<< HEAD
    if (error) throw error;
    if (data.user) setUser(mapSupabaseUserToAppUser(data.user));
=======

    if (error) throw error;

    if (data.user) {
      setUserAndPersist(data.user);

      try {
        await createUserProfile({
          auth_id: data.user.id,
          email: data.user.email ?? email,
          name,
          nickname: '',
          gender: '',
          country: '',
          language: '',
          timezone: '',
        });
      } catch (profileError) {
        console.error('Error al crear perfil en tabla users:', profileError);
      }
    }
>>>>>>> origin/staging
  };

  const login = async ({ email, password }: LoginCredentials): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
<<<<<<< HEAD
    if (data.user) setUser(mapSupabaseUserToAppUser(data.user));
=======
    if (data.user) setUserAndPersist(data.user);
>>>>>>> origin/staging
  };

  const loginWithGoogle = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) throw error;
  };

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
<<<<<<< HEAD
    setUser(null);
=======
    setUserAndPersist(null);
>>>>>>> origin/staging
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

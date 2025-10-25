import { supabase } from '../lib/supabaseClient';
import type { UserProfile } from '../types/UserType';

export const createUserProfile = async (
  profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>,
): Promise<UserProfile | null> => {
  const { data, error } = await supabase.from('users').insert([profile]).select().single();

  if (error) {
    console.error('Error al crear perfil de usuario:', error);
    throw error;
  }

  return data;
};

export const getUserProfileByEmail = async (email: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();

  if (error) {
    console.error('Error al obtener perfil:', error);
    return null;
  }

  return data;
};

export const updateUserProfile = async (
  authId: string,
  updates: Partial<UserProfile>,
): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('auth_id', authId)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar perfil:', error);
    throw error;
  }

  return data;
};

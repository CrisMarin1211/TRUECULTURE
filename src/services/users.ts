import { supabase } from '../lib/supabaseClient';
import type { UserProfile } from '../types/UserType';
import type { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
type Level = Database['public']['Tables']['levels']['Row'];

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

export const getUserProfileByUserId = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase.from('users').select('*').eq('auth_id', userId).single();

  if (error) {
    console.error('Error al obtener perfil:', error);
    return null;
  }

  return data;
};

export const getUserProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error al obtener el perfil:', error);
    return null;
  }

  return data;
};

export const updateUserProfile = async (
  userId: string,
  updates: ProfileUpdate,
): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar el perfil:', error);
    throw error;
  }

  return data;
};

export const updateAvatarUser = async (userId: string, avatarUrl: string) => {
  const { data, error } = await supabase
    .from('users')
    .update({ avatar_url: avatarUrl })
    .eq('auth_id', userId)
    .single();

  if (error) throw error;

  return data;
};

export const getLevels = async (): Promise<Level[]> => {
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .order('level_number', { ascending: true });

  if (error) {
    console.error('Error al obtener los niveles:', error);
    return [];
  }

  return data;
};

export const uploadAvatar = async (userId: string, file: File): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Math.random()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

  if (uploadError) {
    console.error('Error al subir el avatar:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  return data.publicUrl;
};

export const getUserOrganizationByEmail = async (email: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('organization')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error al obtener organización:', error);
    return null;
  }

  return data.organization || null;
};

export const updateUserByUserId = async (
  userId: string,
  updates: Partial<UserProfile>,
): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('auth_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar UserProfile:', error);
    throw error;
  }

  if (!data) return null;

  return data;
};
export interface AppUser {
  id: string;
  email: string;
  name?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
  organization?: string;
}

export interface UserProfile {
  id?: number;
  auth_id?: string;
  email: string;
  name?: string;
  nickname?: string;
  organization?: string;
  avatar_url?: string;
  gender?: string;
  country?: string;
  language?: string;
  timezone?: string;
  created_at?: string;
  updated_at?: string;
}

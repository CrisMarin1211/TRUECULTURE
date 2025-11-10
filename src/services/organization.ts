import { supabase } from '../lib/supabaseClient';
import { getUserOrganizationByEmail } from "../services/users"

export const fetchOrganization = async (): Promise<string | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const organization = await getUserOrganizationByEmail(user.email);
  return organization;
};
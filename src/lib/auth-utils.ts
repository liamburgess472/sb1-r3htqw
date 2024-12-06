import { supabase } from './supabase';
import { useAuth } from '@/contexts/AuthContext';

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting current user:', error);
    return null;
  }
  
  return user;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error getting user profile:', error);
    return null;
  }

  return data;
}

export function useRequireAuth() {
  const { user, loading } = useAuth();
  
  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}

export async function checkUserPermissions(userId: string, permission: string) {
  const { data, error } = await supabase
    .from('user_permissions')
    .select('*')
    .eq('user_id', userId)
    .eq('permission', permission)
    .single();

  if (error) {
    console.error('Error checking user permissions:', error);
    return false;
  }

  return !!data;
}

export function useIsAdmin() {
  const { user } = useAuth();
  return user?.email === 'admin@createrinspired.com';
}
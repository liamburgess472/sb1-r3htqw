import { supabase } from '@/lib/supabase';
import { type AuthUser } from '@/types/auth';

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`Sign-in failed: ${error.message}`);
  return {
    user: data.user as AuthUser
  };
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        avatar_url: null,
        full_name: email.split('@')[0]
      }
    }
  });
  if (error) throw new Error(`Sign-up failed: ${error.message}`);
  return {
    user: data.user as AuthUser
  };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function isAdmin(user: AuthUser | null): boolean {
  return !!user && user.email === 'admin@creatorinspired.com';
}

export function getDefaultUserSettings() {
  return {
    theme: 'system' as const,
    emailNotifications: true,
    weeklyDigest: true,
    mealPlanReminders: true,
    measurementUnit: 'metric' as const,
    dietaryPreferences: [] as string[]
  };
}
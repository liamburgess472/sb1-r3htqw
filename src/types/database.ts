import { type Database } from '@/types/supabase';

export type DbInfluencer = Database['public']['Tables']['influencers']['Row'];
export type DbRecipe = Database['public']['Tables']['recipes']['Row'];
export type DbMealPlan = Database['public']['Tables']['meal_plans']['Row'];

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavedRecipe {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
}

export interface MealPlanEntry {
  id: string;
  user_id: string;
  recipe_id: string;
  planned_date: string;
  created_at: string;
}

export interface ShoppingListItem {
  id: string;
  user_id: string;
  name: string;
  amount: string;
  unit: string;
  category: string;
  completed: boolean;
  recipe_id: string | null;
  created_at: string;
}

export const dayMapping = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7
} as const;

export type DayOfWeek = keyof typeof dayMapping;
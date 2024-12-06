import { supabase } from '@/lib/supabase';
import { startOfWeek, format } from 'date-fns';
import { validate as isUUID } from 'uuid';
import { type DayOfWeek, dayMapping } from '@/types/database';

const validateUUID = (id: string, label: string) => {
  if (!isUUID(id)) {
    throw new Error(`Invalid ${label} format`);
  }
};

export const MealPlanService = {
  addToMealPlan: async (userId: string, recipeId: string, date: Date) => {
    try {
      validateUUID(userId, 'user ID');
      validateUUID(recipeId, 'recipe ID');

      const weekStart = startOfWeek(date);
      const dayName = format(date, 'EEEE').toLowerCase() as DayOfWeek;
      const dayOfWeek = dayMapping[dayName];

      if (dayOfWeek === undefined) {
        throw new Error(`Invalid day of week: ${dayName}`);
      }

      const { data, error } = await supabase
        .from('meal_plans')
        .insert([{ 
          user_id: userId, 
          week_start_date: weekStart.toISOString().split('T')[0],
          day_of_week: dayOfWeek, 
          recipe_id: recipeId 
        }])
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding to meal plan:', error);
      throw new Error('Could not add to the meal plan. Please try again.');
    }
  },

  getMealPlan: async (userId: string, weekStartDate: Date) => {
    try {
      validateUUID(userId, 'user ID');

      const formattedDate = weekStartDate.toISOString().split('T')[0];
      console.log('Fetching meal plan for:', { userId, weekStartDate: formattedDate });

      const { data, error } = await supabase
        .from('meal_plans')
        .select(`
          id,
          day_of_week,
          recipe:recipes (
            id,
            title,
            image_url,
            prep_time,
            cook_time,
            influencer:influencers (
              id,
              name,
              avatar_url
            )
          )
        `)
        .eq('user_id', userId)
        .eq('week_start_date', formattedDate);

      if (error) throw error;

      console.log('Meal plan data received:', data);
      return data || [];
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      return []; // Return empty array instead of throwing to prevent UI errors
    }
  },

  removeMealPlan: async (userId: string, recipeId: string, date: Date) => {
    try {
      validateUUID(userId, 'user ID');
      validateUUID(recipeId, 'recipe ID');

      const weekStart = startOfWeek(date);
      const dayName = format(date, 'EEEE').toLowerCase() as DayOfWeek;
      const dayOfWeek = dayMapping[dayName];

      if (dayOfWeek === undefined) {
        throw new Error(`Invalid day of week: ${dayName}`);
      }

      const { error } = await supabase
        .from('meal_plans')
        .delete()
        .match({ 
          user_id: userId, 
          week_start_date: weekStart.toISOString().split('T')[0],
          day_of_week: dayOfWeek,
          recipe_id: recipeId 
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error removing from meal plan:', error);
      throw new Error('Could not remove from the meal plan. Please try again.');
    }
  }
};
import { type Recipe } from '@/types/recipe';
import { type DbRecipe } from '@/types/database';
import { supabase } from '@/lib/supabase';

function mapDbRecipeToRecipe(dbRecipe: DbRecipe & { 
  influencer: { id: string; name: string; avatar_url: string; } 
}): Recipe {
  return {
    id: dbRecipe.id,
    title: dbRecipe.title,
    description: dbRecipe.description,
    image: dbRecipe.image_url,
    prepTime: dbRecipe.prep_time,
    cookTime: dbRecipe.cook_time,
    servings: dbRecipe.servings,
    calories: dbRecipe.calories,
    tags: dbRecipe.tags || [],
    ingredients: dbRecipe.ingredients || [],
    instructions: dbRecipe.instructions || [],
    nutritionalInfo: dbRecipe.nutritional_info,
    influencer: {
      id: dbRecipe.influencer.id,
      name: dbRecipe.influencer.name,
      avatar: dbRecipe.influencer.avatar_url
    }
  };
}

export const RecipeService = {
  getAll: async (): Promise<Recipe[]> => {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select(`
        *,
        influencer:influencers (
          id,
          name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!recipes) return [];

    return recipes.map(recipe => mapDbRecipeToRecipe(recipe as any));
  },

  getById: async (id: string): Promise<Recipe> => {
    const { data: recipe, error } = await supabase
      .from('recipes')
      .select(`
        *,
        influencer:influencers (
          id,
          name,
          avatar_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!recipe) throw new Error('Recipe not found');

    return mapDbRecipeToRecipe(recipe as any);
  },

  create: async (recipe: Omit<Recipe, 'id' | 'influencer'> & { influencerId: string }): Promise<Recipe> => {
    const { data, error } = await supabase
      .from('recipes')
      .insert({
        title: recipe.title,
        description: recipe.description,
        image_url: recipe.image,
        prep_time: recipe.prepTime,
        cook_time: recipe.cookTime,
        servings: recipe.servings,
        calories: recipe.calories,
        tags: recipe.tags,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        influencer_id: recipe.influencerId
      })
      .select(`
        *,
        influencer:influencers (
          id,
          name,
          avatar_url
        )
      `)
      .single();

    if (error) {
      console.error('Error creating recipe:', error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Failed to create recipe - no data returned');
    }

    return mapDbRecipeToRecipe(data as any);
  },

  update: async (id: string, updates: Partial<Omit<Recipe, 'id' | 'influencer'> & { influencerId: string }>): Promise<Recipe> => {
    const { data, error } = await supabase
      .from('recipes')
      .update({
        title: updates.title,
        description: updates.description,
        image_url: updates.image,
        prep_time: updates.prepTime,
        cook_time: updates.cookTime,
        servings: updates.servings,
        calories: updates.calories,
        tags: updates.tags,
        ingredients: updates.ingredients,
        instructions: updates.instructions,
        influencer_id: updates.influencerId
      })
      .eq('id', id)
      .select(`
        *,
        influencer:influencers (
          id,
          name,
          avatar_url
        )
      `)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update recipe - no data returned');

    return mapDbRecipeToRecipe(data as any);
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
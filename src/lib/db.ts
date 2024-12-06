import { supabase } from './supabase';
import { type Recipe } from '@/types/recipe';

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    console.log('Fetching recipes...');
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select(`
        *,
        influencer:influencers (
          id,
          name,
          avatar_url
        )
      `);

    if (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }

    if (!recipes || recipes.length === 0) {
      console.log('No recipes found in database');
      return [];
    }

    console.log(`Found ${recipes.length} recipes`);

    return recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      image: recipe.image_url,
      prepTime: recipe.prep_time,
      cookTime: recipe.cook_time,
      servings: recipe.servings,
      calories: recipe.calories,
      tags: recipe.tags || [],
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      nutritionalInfo: recipe.nutritional_info,
      influencer: {
        name: recipe.influencer?.name || 'Unknown',
        avatar: recipe.influencer?.avatar_url || '',
      }
    }));
  } catch (error) {
    console.error('Error in fetchRecipes:', error);
    throw error;
  }
}

export async function fetchFeaturedRecipes(): Promise<Recipe[]> {
  try {
    console.log('Fetching featured recipes...');
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
      .limit(6);

    if (error) {
      console.error('Error fetching featured recipes:', error);
      throw error;
    }

    if (!recipes || recipes.length === 0) {
      console.log('No featured recipes found in database');
      return [];
    }

    console.log(`Found ${recipes.length} featured recipes`);

    return recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      image: recipe.image_url,
      prepTime: recipe.prep_time,
      cookTime: recipe.cook_time,
      servings: recipe.servings,
      calories: recipe.calories,
      tags: recipe.tags || [],
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      nutritionalInfo: recipe.nutritional_info,
      influencer: {
        name: recipe.influencer?.name || 'Unknown',
        avatar: recipe.influencer?.avatar_url || '',
      }
    }));
  } catch (error) {
    console.error('Error in fetchFeaturedRecipes:', error);
    throw error;
  }
}

export async function fetchRecipeById(id: string): Promise<Recipe | null> {
  try {
    console.log(`Fetching recipe with id: ${id}`);
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

    if (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }

    if (!recipe) {
      console.log('No recipe found with this id');
      return null;
    }

    console.log('Recipe found:', recipe.title);

    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      image: recipe.image_url,
      prepTime: recipe.prep_time,
      cookTime: recipe.cook_time,
      servings: recipe.servings,
      calories: recipe.calories,
      tags: recipe.tags || [],
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      nutritionalInfo: recipe.nutritional_info,
      influencer: {
        name: recipe.influencer?.name || 'Unknown',
        avatar: recipe.influencer?.avatar_url || '',
      }
    };
  } catch (error) {
    console.error('Error in fetchRecipeById:', error);
    throw error;
  }
}
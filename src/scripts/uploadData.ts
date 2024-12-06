import { createClient } from '@supabase/supabase-js';
import { allRecipes } from '../data/recipes';
import { influencers } from '../data/influencers';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables:');
  if (!supabaseUrl) console.error('- VITE_SUPABASE_URL');
  if (!supabaseKey) console.error('- VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadData() {
  try {
    console.log('Starting data upload...');
    console.log('Using Supabase URL:', supabaseUrl);

    // Clear existing data
    console.log('Clearing existing data...');
    await supabase.from('recipes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('influencers').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Upload influencers
    console.log('Uploading influencers...');
    for (const influencer of influencers) {
      const { data, error: influencerError } = await supabase
        .from('influencers')
        .insert({
          name: influencer.name,
          avatar_url: influencer.avatar,
          cover_image_url: influencer.coverImage,
          bio: influencer.bio,
          social_media: influencer.socialMedia,
          specialties: influencer.specialties,
          followers: influencer.followers,
          recipes_count: influencer.recipesCount
        })
        .select()
        .single();

      if (influencerError) {
        console.error(`Error uploading influencer ${influencer.name}:`, influencerError);
      } else {
        console.log(`Successfully uploaded influencer: ${influencer.name} with ID: ${data.id}`);
        
        // Upload recipes for this influencer
        const influencerRecipes = allRecipes.filter(r => r.influencer.name === influencer.name);
        
        for (const recipe of influencerRecipes) {
          const { error: recipeError } = await supabase
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
              nutritional_info: recipe.nutritionalInfo,
              influencer_id: data.id
            });

          if (recipeError) {
            console.error(`Error uploading recipe ${recipe.title}:`, recipeError);
          } else {
            console.log(`Successfully uploaded recipe: ${recipe.title}`);
          }

          // Small delay to prevent rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      // Small delay to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('Data upload completed successfully!');
  } catch (error) {
    console.error('Error during data upload:', error);
    process.exit(1);
  }
}

uploadData();
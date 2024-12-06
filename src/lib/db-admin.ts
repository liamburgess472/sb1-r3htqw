import { getRecipes, getInfluencers, getUser } from './cache';
import { type Recipe } from '@/types/recipe';
import { type Influencer } from '@/types/influencer';

interface UserStats {
  id: string;
  email: string;
  lastLogin: string;
  weeklyRecipeCount: number;
}

// Mock data for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'admin@createrinspired.com',
    lastLogin: new Date().toISOString(),
    weeklyRecipeCount: 12
  },
  {
    id: '2',
    email: 'test@createrinspired.com',
    lastLogin: new Date().toISOString(),
    weeklyRecipeCount: 5
  }
];

export async function getUserStats(): Promise<UserStats[]> {
  // In a real application, this would fetch from a database
  return mockUsers;
}

export async function getRecipeStats() {
  const recipes = getRecipes();
  const totalRecipes = recipes.length;
  const recipesPerInfluencer = recipes.reduce((acc, recipe) => {
    const influencerName = recipe.influencer.name;
    acc[influencerName] = (acc[influencerName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalRecipes,
    recipesPerInfluencer
  };
}

export async function getInfluencerStats() {
  const influencers = getInfluencers();
  const totalInfluencers = influencers.length;
  const totalFollowers = influencers.reduce((sum, inf) => sum + inf.followers, 0);

  return {
    totalInfluencers,
    totalFollowers,
    averageFollowers: Math.round(totalFollowers / totalInfluencers)
  };
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const recipes = getRecipes();
  const lowercaseQuery = query.toLowerCase();
  
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(lowercaseQuery) ||
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export async function searchInfluencers(query: string): Promise<Influencer[]> {
  const influencers = getInfluencers();
  const lowercaseQuery = query.toLowerCase();
  
  return influencers.filter(influencer => 
    influencer.name.toLowerCase().includes(lowercaseQuery) ||
    influencer.bio.toLowerCase().includes(lowercaseQuery) ||
    influencer.specialties.some(specialty => 
      specialty.toLowerCase().includes(lowercaseQuery)
    )
  );
}

export async function getDashboardStats() {
  const recipes = getRecipes();
  const influencers = getInfluencers();
  const users = mockUsers;

  return {
    totalRecipes: recipes.length,
    totalInfluencers: influencers.length,
    totalUsers: users.length,
    recentActivity: {
      newRecipes: recipes.slice(-5),
      newUsers: users.slice(-5),
      popularInfluencers: influencers
        .sort((a, b) => b.followers - a.followers)
        .slice(0, 5)
    }
  };
}
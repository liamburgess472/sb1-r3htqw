import { type Influencer } from '@/types/influencer';
import { type DbInfluencer } from '@/types/database';
import { supabase } from '@/lib/supabase';

function mapDbInfluencerToInfluencer(dbInfluencer: DbInfluencer): Influencer {
  return {
    id: dbInfluencer.id,
    name: dbInfluencer.name,
    avatar: dbInfluencer.avatar_url,
    coverImage: dbInfluencer.cover_image_url,
    bio: dbInfluencer.bio,
    socialMedia: dbInfluencer.social_media,
    specialties: dbInfluencer.specialties || [],
    followers: dbInfluencer.followers,
    recipesCount: dbInfluencer.recipes_count
  };
}

export const InfluencerService = {
  getAll: async (): Promise<Influencer[]> => {
    const { data: influencers, error } = await supabase
      .from('influencers')
      .select('*');

    if (error) throw error;
    if (!influencers) return [];

    return influencers.map(mapDbInfluencerToInfluencer);
  },

  getById: async (id: string): Promise<Influencer> => {
    const { data: influencer, error } = await supabase
      .from('influencers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!influencer) throw new Error('Influencer not found');

    return mapDbInfluencerToInfluencer(influencer);
  },

  create: async (influencer: Omit<Influencer, 'id'>): Promise<Influencer> => {
    const { data, error } = await supabase
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

    if (error) throw error;
    if (!data) throw new Error('Failed to create influencer - no data returned');

    return mapDbInfluencerToInfluencer(data);
  },

  update: async (id: string, updates: Partial<Omit<Influencer, 'id'>>): Promise<Influencer> => {
    const { data, error } = await supabase
      .from('influencers')
      .update({
        name: updates.name,
        avatar_url: updates.avatar,
        cover_image_url: updates.coverImage,
        bio: updates.bio,
        social_media: updates.socialMedia,
        specialties: updates.specialties,
        followers: updates.followers,
        recipes_count: updates.recipesCount
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to update influencer - no data returned');

    return mapDbInfluencerToInfluencer(data);
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('influencers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  search: async (query: string): Promise<Influencer[]> => {
    const { data: influencers, error } = await supabase
      .from('influencers')
      .select('*')
      .or(`name.ilike.%${query}%,bio.ilike.%${query}%`);

    if (error) throw error;
    if (!influencers) return [];

    return influencers.map(mapDbInfluencerToInfluencer);
  }
};
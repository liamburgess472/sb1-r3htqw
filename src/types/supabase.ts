export interface Database {
  public: {
    Tables: {
      influencers: {
        Row: {
          id: string;
          name: string;
          avatar_url: string;
          cover_image_url: string;
          bio: string;
          social_media: Array<{
            platform: string;
            url: string;
            username: string;
          }>;
          specialties: string[];
          followers: number;
          recipes_count: number;
          created_at: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string;
          prep_time: number;
          cook_time: number;
          servings: number;
          calories: number;
          tags: string[];
          ingredients: Array<{
            name: string;
            amount: string;
            unit: string;
          }>;
          instructions: string[];
          nutritional_info?: {
            protein: number;
            carbs: number;
            fat: number;
            fiber: number;
            sugar: number;
            sodium: number;
          };
          influencer_id: string;
          created_at: string;
        };
      };
      meal_plans: {
        Row: {
          id: string;
          user_id: string;
          recipe_id: string;
          week_start_date: string;
          day_of_week: number;
          created_at: string;
        };
      };
    };
  };
}
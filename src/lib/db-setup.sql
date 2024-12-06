-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS public.influencers (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_url TEXT,
    cover_image_url TEXT,
    bio TEXT,
    social_media JSONB,
    specialties TEXT[],
    followers INTEGER,
    recipes_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.recipes (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER,
    calories INTEGER,
    tags TEXT[],
    ingredients JSONB,
    instructions TEXT[],
    nutritional_info JSONB,
    influencer_id uuid REFERENCES public.influencers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Set up Row Level Security policies
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view influencers"
ON public.influencers FOR SELECT
USING (true);

CREATE POLICY "Anyone can view recipes"
ON public.recipes FOR SELECT
USING (true);

-- Allow insert/update/delete for authenticated users
CREATE POLICY "Authenticated users can insert recipes"
ON public.recipes FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update recipes"
ON public.recipes FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete recipes"
ON public.recipes FOR DELETE
USING (auth.role() = 'authenticated');
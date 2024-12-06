export interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  influencer: {
    id: string;
    name: string;
    avatar: string;
  };
  tags: string[];
  description: string;
  ingredients?: {
    name: string;
    amount: string;
    unit: string;
  }[];
  instructions?: string[];
  nutritionalInfo?: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
}

export interface RecipeCardProps {
  recipe: Recipe;
  onInfluencerClick?: (name: string) => void;
}

export interface RecipeHeaderProps {
  recipe: Recipe;
}

export interface RecipeIngredientsProps {
  ingredients: NonNullable<Recipe['ingredients']>;
  servings: number;
}

export interface RecipeInstructionsProps {
  instructions: NonNullable<Recipe['instructions']>;
}

export interface RecipeNutritionProps {
  nutritionalInfo?: Recipe['nutritionalInfo'];
  calories: number;
}

export interface RecipeFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export interface RecipeGridProps {
  onInfluencerClick?: (name: string) => void;
}

export interface RecipeFormData {
  title: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  calories: string;
  tags: string;
  ingredients: NonNullable<Recipe['ingredients']>;
  instructions: string[];
  influencerId: string;
}

export interface RecipeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingRecipe?: Recipe;
}

export interface RecipeImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  influencerId: string;
}
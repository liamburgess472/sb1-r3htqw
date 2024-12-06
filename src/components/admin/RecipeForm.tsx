import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { RecipeService } from "@/lib/services/recipe-service";
import { type Recipe, type RecipeFormProps, type RecipeFormData } from "@/types/recipe";
import { IngredientInput } from "./recipe/IngredientInput";
import { InstructionsInput } from "./recipe/InstructionsInput";
import { InfluencerSelect } from "./recipe/InfluencerSelect";
import { Loader2 } from "lucide-react";

const defaultFormData: RecipeFormData = {
  title: '',
  description: '',
  image: '',
  prepTime: '0',
  cookTime: '0',
  servings: '4',
  calories: '0',
  tags: '',
  ingredients: [],
  instructions: [],
  influencerId: ''
};

export function RecipeForm({ open, onOpenChange, editingRecipe }: RecipeFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [formData, setFormData] = useState<RecipeFormData>(defaultFormData);

  useEffect(() => {
    if (editingRecipe) {
      setFormData({
        title: editingRecipe.title,
        description: editingRecipe.description,
        image: editingRecipe.image,
        prepTime: editingRecipe.prepTime.toString(),
        cookTime: editingRecipe.cookTime.toString(),
        servings: editingRecipe.servings.toString(),
        calories: editingRecipe.calories.toString(),
        tags: editingRecipe.tags.join(', '),
        ingredients: editingRecipe.ingredients || [],
        instructions: editingRecipe.instructions || [],
        influencerId: editingRecipe.influencer.id
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [editingRecipe]);

  const validateRecipeCreation = async (recipeId: string): Promise<boolean> => {
    setValidating(true);
    try {
      const recipe = await RecipeService.getById(recipeId);
      return !!recipe;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const recipeData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        prepTime: parseInt(formData.prepTime),
        cookTime: parseInt(formData.cookTime),
        servings: parseInt(formData.servings),
        calories: parseInt(formData.calories),
        tags: formData.tags.split(',').map(t => t.trim()),
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        influencerId: formData.influencerId
      };

      let recipe: Recipe;
      if (editingRecipe) {
        recipe = await RecipeService.update(editingRecipe.id, recipeData);
      } else {
        recipe = await RecipeService.create(recipeData);
      }

      const isValid = await validateRecipeCreation(recipe.id);
      
      if (isValid) {
        toast({
          title: "Success! 🎉",
          description: editingRecipe 
            ? "Recipe updated successfully and verified in the database."
            : "Recipe created successfully and verified in the database.",
          duration: 5000,
        });
        onOpenChange(false);
      } else {
        throw new Error("Recipe validation failed");
      }
    } catch (error) {
      toast({
        title: editingRecipe ? "Error updating recipe" : "Error creating recipe",
        description: error instanceof Error ? error.message : "An error occurred while saving the recipe",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain the same */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
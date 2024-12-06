import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Recipe } from "@/types/recipe";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstructions } from "./RecipeInstructions";
import { RecipeNutrition } from "./RecipeNutrition";
import { InfluencerSidebar } from "./InfluencerSidebar";
import { RecipeService } from "@/lib/services/recipe-service";
import { useEffect, useState } from "react";

export function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipe() {
      if (!id) return;
      try {
        const data = await RecipeService.getById(id);
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load recipe');
      } finally {
        setLoading(false);
      }
    }
    loadRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
        <p className="text-muted-foreground mb-6">{error || "The requested recipe could not be found."}</p>
        <Button onClick={() => navigate("/recipes")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to recipes
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        onClick={() => navigate("/recipes")} 
        variant="ghost" 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to recipes
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <RecipeHeader recipe={recipe} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <RecipeIngredients 
              ingredients={recipe.ingredients || []} 
              servings={recipe.servings} 
            />
            <RecipeNutrition 
              nutritionalInfo={recipe.nutritionalInfo} 
              calories={recipe.calories} 
            />
          </div>

          <RecipeInstructions instructions={recipe.instructions || []} />
        </div>

        <div className="lg:col-span-1">
          <InfluencerSidebar influencer={recipe.influencer} />
        </div>
      </div>
    </div>
  );
}
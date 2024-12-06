import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Recipe } from "@/types/recipe";
import { RecipeService } from "@/lib/services/recipe-service";
import { DaySelectorDialog } from "@/components/recipe/DaySelectorDialog";

export function SuggestedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadRecipes() {
      const allRecipes = await RecipeService.getAll();
      // Get 5 random recipes for suggestions
      const shuffled = allRecipes.sort(() => 0.5 - Math.random());
      setRecipes(shuffled.slice(0, 5));
    }
    loadRecipes();
  }, []);

  const handleAddClick = (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation(); // Prevent card click navigation
    setSelectedRecipe(recipe);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Suggested Recipes</h2>
        <Button variant="ghost" onClick={() => navigate("/recipes")}>
          View All
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recipes.map((recipe) => (
          <Card 
            key={recipe.id}
            className="group cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          >
            <div className="aspect-square relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                onClick={(e) => handleAddClick(e, recipe)}
              >
                <PlusCircle className="h-5 w-5 text-primary" />
                <span className="sr-only">Add to meal plan</span>
              </Button>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-sm line-clamp-2">{recipe.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRecipe && (
        <DaySelectorDialog
          recipe={selectedRecipe}
          open={!!selectedRecipe}
          onOpenChange={() => setSelectedRecipe(null)}
        />
      )}
    </section>
  );
}
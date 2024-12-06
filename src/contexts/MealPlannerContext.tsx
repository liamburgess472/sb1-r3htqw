import { createContext, useContext, useState, useEffect } from "react";
import { addDays, startOfWeek, format } from "date-fns";
import { useAuth } from "./AuthContext";
import { MealPlanService } from "@/lib/services/meal-plan-service";
import { useToast } from "@/hooks/use-toast";
import { type Recipe } from "@/types/recipe";
import { 
  type MealPlanDay, 
  type MealPlanContextType, 
  type MealPlanProviderProps 
} from "@/types/meal-planner";
import { type DayOfWeek, dayMapping } from "@/types/database";

const MealPlannerContext = createContext<MealPlanContextType | undefined>(undefined);

export function MealPlannerProvider({ children }: MealPlanProviderProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>(() => {
    const today = new Date();
    const weekStart = startOfWeek(today);
    return Array.from({ length: 7 }, (_, i) => ({
      id: `day-${i}`,
      date: addDays(weekStart, i),
      meals: [],
    }));
  });

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    async function loadMealPlan() {
      setLoading(true);
      try {
        const weekStart = startOfWeek(new Date());
        const data = await MealPlanService.getMealPlan(user.id, weekStart);
        
        if (!data || data.length === 0) {
          setMealPlan(mealPlan.map((day) => ({ ...day, meals: [] })));
          setLoading(false);
          return;
        }

        const newMealPlan = mealPlan.map((day) => {
          const dayName = format(day.date, 'EEEE').toLowerCase() as DayOfWeek;
          const dayOfWeek = dayMapping[dayName];
          
          const dayMeals = data
            .filter(meal => meal.day_of_week === dayOfWeek && meal.recipe)
            .map(meal => ({
              id: meal.recipe.id,
              title: meal.recipe.title,
              image: meal.recipe.image_url,
              prepTime: meal.recipe.prep_time,
              cookTime: meal.recipe.cook_time,
              servings: 4,
              calories: 0,
              influencer: {
                id: meal.recipe.influencer.id,
                name: meal.recipe.influencer.name,
                avatar: meal.recipe.influencer.avatar_url,
              },
              tags: [],
              description: "",
            }));

          return { ...day, meals: dayMeals };
        });

        setMealPlan(newMealPlan);
      } catch (error) {
        console.error('Error loading meal plan:', error);
        toast({
          title: "Error loading meal plan",
          description: error instanceof Error ? error.message : "Failed to load meal plan",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadMealPlan();
  }, [user, toast]);

  const addRecipeToMealPlan = async (recipe: Recipe, date?: Date) => {
    if (!user?.id) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add recipes to your meal plan.",
        variant: "destructive"
      });
      return;
    }

    const targetDate = date || new Date();
    
    try {
      await MealPlanService.addToMealPlan(user.id, recipe.id, targetDate);
      
      setMealPlan((currentPlan) => {
        return currentPlan.map((day) => {
          if (day.date.toDateString() === targetDate.toDateString()) {
            return {
              ...day,
              meals: [...day.meals, recipe],
            };
          }
          return day;
        });
      });

      toast({
        title: "Recipe added",
        description: `${recipe.title} has been added to your meal plan.`
      });
    } catch (error) {
      toast({
        title: "Error adding to meal plan",
        description: error instanceof Error ? error.message : "Failed to add recipe to meal plan",
        variant: "destructive"
      });
    }
  };

  const removeRecipeFromMealPlan = async (recipeId: string, date: Date) => {
    if (!user?.id) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to remove recipes from your meal plan.",
        variant: "destructive"
      });
      return;
    }

    try {
      await MealPlanService.removeMealPlan(user.id, recipeId, date);
      
      setMealPlan((currentPlan) => {
        return currentPlan.map((day) => {
          if (day.date.toDateString() === date.toDateString()) {
            return {
              ...day,
              meals: day.meals.filter((meal) => meal.id !== recipeId),
            };
          }
          return day;
        });
      });

      toast({
        title: "Recipe removed",
        description: "Recipe has been removed from your meal plan."
      });
    } catch (error) {
      toast({
        title: "Error removing from meal plan",
        description: error instanceof Error ? error.message : "Failed to remove recipe from meal plan",
        variant: "destructive"
      });
    }
  };

  return (
    <MealPlannerContext.Provider
      value={{ 
        mealPlan, 
        loading,
        addRecipeToMealPlan, 
        removeRecipeFromMealPlan 
      }}
    >
      {children}
    </MealPlannerContext.Provider>
  );
}

export function useMealPlanner() {
  const context = useContext(MealPlannerContext);
  if (context === undefined) {
    throw new Error("useMealPlanner must be used within a MealPlannerProvider");
  }
  return context;
}
import { type Recipe } from './recipe';

export interface MealPlanDay {
  id: string;
  date: Date;
  meals: Recipe[];
}

export interface MealPlanContextType {
  mealPlan: MealPlanDay[];
  loading: boolean;
  addRecipeToMealPlan: (recipe: Recipe, date?: Date) => Promise<void>;
  removeRecipeFromMealPlan: (recipeId: string, date: Date) => Promise<void>;
}

export interface MealPlanProviderProps {
  children: React.ReactNode;
}

export interface WeeklyCalendarProps {
  weekDays: MealPlanDay[];
  currentWeek: Date;
  onWeekChange: (date: Date) => void;
  onAddClick: () => void;
}

export interface DaySelectorDialogProps {
  recipe: Recipe;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
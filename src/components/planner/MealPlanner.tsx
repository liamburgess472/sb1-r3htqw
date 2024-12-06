import { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeeklyCalendar } from "./WeeklyCalendar";
import { SuggestionsSidebar } from "./SuggestionsSidebar";
import { useMealPlanner } from "@/contexts/MealPlannerContext";
import { useNavigate } from "react-router-dom";

export function MealPlanner() {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const { mealPlan, loading } = useMealPlanner();

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentWeek, i);
    return {
      date,
      dayName: format(date, 'EEEE'),
      meals: mealPlan.find(day => 
        format(day.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )?.meals || []
    };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Weekly Meal Planner
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Plan your meals for the week ahead and stay organized
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <WeeklyCalendar 
            weekDays={weekDays}
            currentWeek={currentWeek}
            onWeekChange={setCurrentWeek}
            onAddClick={() => navigate("/recipes")}
          />
        </div>
        <div className="lg:col-span-1">
          <SuggestionsSidebar />
          <Button 
            size="lg" 
            className="w-full mt-4 gap-2"
            onClick={() => navigate("/recipes")}
          >
            <Plus className="h-5 w-5" />
            Add New Recipe
          </Button>
        </div>
      </div>
    </div>
  );
}
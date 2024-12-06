import { format, addWeeks, subWeeks } from "date-fns";
import { ChevronLeft, ChevronRight, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Recipe } from "@/types/recipe";
import { useMealPlanner } from "@/contexts/MealPlannerContext";

interface WeeklyCalendarProps {
  weekDays: {
    date: Date;
    dayName: string;
    meals: Recipe[];
  }[];
  currentWeek: Date;
  onWeekChange: (date: Date) => void;
  onAddClick: () => void;
}

export function WeeklyCalendar({ weekDays, currentWeek, onWeekChange, onAddClick }: WeeklyCalendarProps) {
  const { removeRecipeFromMealPlan } = useMealPlanner();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onWeekChange(subWeeks(currentWeek, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold">
          Week of {format(currentWeek, 'MMMM d, yyyy')}
        </h3>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onWeekChange(addWeeks(currentWeek, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {weekDays.map((day) => (
          <Card key={format(day.date, 'yyyy-MM-dd')} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{day.dayName}</h4>
                <span className="text-sm text-muted-foreground">
                  {format(day.date, 'MMM d')}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onAddClick}
                className="h-8 w-8 rounded-full hover:bg-primary/10 text-foreground hover:text-primary"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {day.meals.length > 0 ? (
              <ul className="space-y-3">
                {day.meals.map((meal, index) => (
                  <li 
                    key={`${meal.id}-${index}`}
                    className="flex items-center justify-between bg-secondary/50 rounded-lg p-2"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={meal.image}
                        alt={meal.title}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">{meal.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {meal.prepTime + meal.cookTime} min
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRecipeFromMealPlan(meal.id, day.date)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="h-24 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                No meals planned
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
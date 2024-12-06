import { useMealPlanner } from "@/contexts/MealPlannerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export function TodaysMeals() {
  const { mealPlan } = useMealPlanner();
  const navigate = useNavigate();
  const today = new Date();
  const todayMeals = mealPlan.find(
    day => format(day.date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  )?.meals || [];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Today's Meals</h2>
        <Button onClick={() => navigate("/planner")} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Plan Meals
        </Button>
      </div>

      {todayMeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todayMeals.map((meal) => (
            <Card key={meal.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{meal.title}</h3>
                <p className="text-sm text-muted-foreground">
                  By {meal.influencer.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">No meals planned for today</p>
            <Button onClick={() => navigate("/planner")}>
              Plan Today's Meals
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
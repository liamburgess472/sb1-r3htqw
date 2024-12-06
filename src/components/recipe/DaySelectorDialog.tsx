import { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Recipe } from "@/types/recipe";
import { useAuth } from "@/contexts/AuthContext";
import { MealPlanService } from "@/lib/services/meal-plan-service";
import { useToast } from "@/hooks/use-toast";

interface DaySelectorDialogProps {
  recipe: Recipe;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DaySelectorDialog({ recipe, open, onOpenChange }: DaySelectorDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(new Date()), i);
    return {
      date,
      dayName: format(date, 'EEEE'),
      dayDate: format(date, 'MMM d')
    };
  });

  const handleDaySelect = async (date: Date) => {
    if (!user?.id) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add recipes to your meal plan.",
        variant: "destructive"
      });
      return;
    }

    setLoading(format(date, 'EEEE'));

    try {
      await MealPlanService.addToMealPlan(user.id, recipe.id, date);
      
      toast({
        title: "Recipe added to meal plan",
        description: `${recipe.title} has been added to ${format(date, 'EEEE, MMM d')}.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error adding to meal plan",
        description: error instanceof Error ? error.message : "Failed to add recipe to meal plan",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Meal Plan</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-2">
            {weekDays.map(({ date, dayName, dayDate }) => (
              <Button
                key={dayName}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => handleDaySelect(date)}
                disabled={loading === dayName}
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="font-semibold">{dayName}</div>
                    <div className="text-sm text-muted-foreground">{dayDate}</div>
                  </div>
                  {loading === dayName && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-r-transparent" />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
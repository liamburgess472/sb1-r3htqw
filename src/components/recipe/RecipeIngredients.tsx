import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
  servings: number;
}

export function RecipeIngredients({ ingredients, servings }: RecipeIngredientsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingredients</CardTitle>
        <p className="text-sm text-muted-foreground">For {servings} servings</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{ingredient.name}</span>
              <span className="text-muted-foreground">
                {ingredient.amount} {ingredient.unit}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
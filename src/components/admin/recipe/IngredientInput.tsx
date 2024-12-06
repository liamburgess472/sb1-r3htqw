import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

interface IngredientInputProps {
  ingredients: Ingredient[];
  onChange: (ingredients: Ingredient[]) => void;
}

const UNITS = ["g", "kg", "ml", "l", "cup", "tbsp", "tsp", "piece", "slice", "unit"];

export function IngredientInput({ ingredients, onChange }: IngredientInputProps) {
  const [error, setError] = useState<string | null>(null);
  
  const handleBulkInput = (value: string) => {
    const lines = value.split('\n').filter(line => line.trim());
    const parsedIngredients: Ingredient[] = [];
    setError(null);

    for (const line of lines) {
      // Try to match common measurement patterns
      const match = line.match(/^([\d./]+)\s*([a-zA-Z]+)?\s+(.+)$/);
      
      if (match) {
        const [, amount, unit, name] = match;
        const normalizedUnit = unit ? 
          UNITS.find(u => u.toLowerCase() === unit.toLowerCase()) || 'unit' : 
          'unit';

        parsedIngredients.push({
          amount: amount.trim(),
          unit: normalizedUnit,
          name: name.trim()
        });
      } else {
        // If no pattern matches, treat the whole line as the ingredient name
        parsedIngredients.push({
          amount: "1",
          unit: "unit",
          name: line.trim()
        });
      }
    }

    onChange(parsedIngredients);
  };

  const getIngredientsText = () => {
    return ingredients
      .map(ing => `${ing.amount} ${ing.unit} ${ing.name}`)
      .join('\n');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Ingredients (one per line)</Label>
        <span className="text-sm text-muted-foreground">
          Format: amount unit ingredient
        </span>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Textarea
        value={getIngredientsText()}
        onChange={(e) => handleBulkInput(e.target.value)}
        placeholder="1 cup flour&#10;2 tbsp sugar&#10;1/2 tsp salt"
        className="min-h-[200px] font-mono"
      />

      <div className="text-sm text-muted-foreground">
        <p>Supported units: {UNITS.join(', ')}</p>
        <p>Example formats:</p>
        <ul className="list-disc list-inside">
          <li>1 cup flour</li>
          <li>2.5 tbsp sugar</li>
          <li>1/2 tsp salt</li>
          <li>3 eggs (unit will be automatically added)</li>
        </ul>
      </div>
    </div>
  );
}
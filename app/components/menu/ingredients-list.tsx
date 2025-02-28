import { Stack, Button, FormControl, IconButton } from "@mui/material";
import { FormField } from "./form-field";

interface IngredientsListProps {
  ingredients: string[];
  onUpdate: (ingredients: string[]) => void;
  readOnly?: boolean;
}

export const IngredientsList = ({
  ingredients,
  onUpdate,
  readOnly,
}: IngredientsListProps) => {
  const handleAdd = () => {
    onUpdate([...ingredients, ""]);
  };

  const handleUpdate = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    onUpdate(updated);
  };

  const handleRemove = (index: number) => {
    onUpdate(ingredients.filter((_, i) => i !== index));
  };

  return (
    <FormControl fullWidth>
      <Stack spacing={1} direction="row" flexWrap="wrap">
        {ingredients.map((ingredient, index) => {
          return (
            <span key={index} className="flex items-center">
              <IconButton onClick={() => handleRemove(index)} color="error">
                <p>Delete</p>
              </IconButton>
              <FormField
                value={ingredient}
                onChange={(value) => handleUpdate(index, value)}
                size="small"
                required
                label={`${index + 1}`}
              />
            </span>
          );
        })}
        {!readOnly && (
          <Button onClick={handleAdd} size="small">
            Add Ingredient
          </Button>
        )}
      </Stack>
    </FormControl>
  );
};

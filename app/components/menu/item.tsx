import { Stack, IconButton, Button, Typography } from "@mui/material";
import { FormField } from "./form-field";
import { IngredientsList } from "./ingredients-list";

interface ItemProps {
  item: Item;
  sectionIndex: number;
  itemIndex: number;
  onUpdate: (field: keyof Item, value: any) => void;
  onRemove: () => void;
  onImageUpload: (file: File) => void;
  readOnly?: boolean;
}

export const Item = ({
  item,
  onUpdate,
  onRemove,
  onImageUpload,
  readOnly,
  itemIndex,
}: ItemProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file);
  };

  return (
    <Stack
      spacing={2}
      sx={{ p: 2, bgcolor: "background.paper" }}
      className="border p-4"
      component="fieldset"
    >
      <legend>Item {itemIndex + 1}</legend>
      <Stack direction="row" spacing={2} alignItems="center">
        <FormField
          label="Item Name"
          value={item.name}
          onChange={(value) => onUpdate("name", value)}
          readOnly={readOnly}
          required
          fullWidth
        />
        {!readOnly && (
          <IconButton onClick={onRemove} color="error">
            <p>Delete</p>
          </IconButton>
        )}
      </Stack>

      <FormField
        label="Description"
        value={item.description ?? ""}
        onChange={(value) => onUpdate("description", value)}
        readOnly={readOnly}
        multiline
        rows={2}
        fullWidth
      />

      <IngredientsList
        ingredients={item.ingredients}
        onUpdate={(ingredients) => onUpdate("ingredients", ingredients)}
        readOnly={readOnly}
      />

      {!readOnly ? (
        <Button component="label" variant="outlined" fullWidth sx={{ mt: 2 }}>
          Upload Image
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg, image/webp"
            onChange={handleImageChange}
          />
        </Button>
      ) : (
        item.image && (
          <Typography variant="caption">Image: {item.image.name}</Typography>
        )
      )}
    </Stack>
  );
};

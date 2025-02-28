import { Stack, IconButton, Divider, Button } from "@mui/material";
import { FormField } from "./form-field";
import { Item } from "./item";

interface SectionProps {
  section: Section;
  sectionIndex: number;
  onUpdate: (field: string, value: string) => void;
  onRemove: () => void;
  onAddItem: () => void;
  onItemUpdate: (itemIndex: number, field: keyof Item, value: any) => void;
  onItemRemove: (itemIndex: number) => void;
  onImageUpload: (itemIndex: number, file: File) => void;
  readOnly?: boolean;
}

export const Section = ({
  section,
  onUpdate,
  onRemove,
  onAddItem,
  onItemUpdate,
  onItemRemove,
  onImageUpload,
  readOnly,
  sectionIndex,
}: SectionProps) => (
  <fieldset className="border p-4">
    <legend>Section {sectionIndex + 1}</legend>
    <Stack spacing={2} mb={3}>
      <Stack direction="row" spacing={2} alignItems="center">
        <FormField
          label="Section Name"
          value={section.name}
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

      {section.items.map((item, itemIndex) => (
        <Item
          key={itemIndex}
          item={item}
          onUpdate={(field, value) => onItemUpdate(itemIndex, field, value)}
          onRemove={() => onItemRemove(itemIndex)}
          onImageUpload={(file) => onImageUpload(itemIndex, file)}
          readOnly={readOnly}
          itemIndex={itemIndex}
          sectionIndex={sectionIndex}
        />
      ))}

      {!readOnly && (
        <Button onClick={onAddItem} sx={{ alignSelf: "flex-start" }}>
          Add Item
        </Button>
      )}
    </Stack>
  </fieldset>
);

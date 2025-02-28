import { useState } from "react";
import { Container, Stack, Button, Typography } from "@mui/material";
import { Section } from "./section";
import { FormField } from "./form-field";

interface MenuFormProps {
  initialData?: Menu;
  readOnly?: boolean;
  onSubmit: (data: Menu) => Promise<void>;
}

const initialItem: Item = {
  name: "",
  ingredients: [""],
  description: "",
  image: undefined,
};

const initialSection: Section = {
  name: "",
  items: [initialItem],
};

export const MenuForm = ({
  initialData,
  readOnly,
  onSubmit,
}: MenuFormProps) => {
  const [formData, setFormData] = useState<Menu>(
    initialData ?? {
      name: "",
      sections: [],
      description: "",
      location: "",
      contact: "",
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  // Section handlers
  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, initialSection],
    }));
  };

  const removeSection = (sectionIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, idx) => idx !== sectionIndex),
    }));
  };

  const updateSection = (
    sectionIndex: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.sections];
      updated[sectionIndex] = { ...updated[sectionIndex], [field]: value };
      return { ...prev, sections: updated };
    });
  };

  // Item handlers
  const updateItem = (
    sectionIndex: number,
    itemIndex: number,
    field: keyof Item,
    value: any
  ) => {
    setFormData((prev) => {
      const updatedSections = [...prev.sections];
      const updatedItems = [...updatedSections[sectionIndex].items];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], [field]: value };
      updatedSections[sectionIndex].items = updatedItems;
      return { ...prev, sections: updatedSections };
    });
  };

  // Add this item handler
  const addItem = (sectionIndex: number) => {
    setFormData((prev) => {
      const updatedSections = [...prev.sections];
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        items: [...updatedSections[sectionIndex].items, { ...initialItem }],
      };
      return { ...prev, sections: updatedSections };
    });
  };

  // Add this item handler
  const removeItem = (sectionIndex: number, itemIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section, idx) => {
        if (idx === sectionIndex) {
          return {
            ...section,
            items: section.items.filter((_, i) => i !== itemIndex),
          };
        }
        return section;
      }),
    }));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {readOnly ? "Menu Details" : "Create New Menu"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} mb={4}>
          <FormField
            label="Restaurant Name"
            value={formData.name}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, name: value }))
            }
            readOnly={readOnly}
            required
          />
          <FormField
            label="Restaurant Info."
            value={formData.description ?? ""}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
            readOnly={readOnly}
          />
          <FormField
            label="Location"
            value={formData.location ?? ""}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, location: value }))
            }
            readOnly={readOnly}
          />
          <FormField
            label="Contact"
            value={formData.contact ?? ""}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, contact: value }))
            }
            readOnly={readOnly}
          />
        </Stack>

        {formData.sections.map((section, sectionIndex) => (
          <Section
            key={sectionIndex}
            section={section}
            sectionIndex={sectionIndex}
            onUpdate={(field, value) =>
              updateSection(sectionIndex, field, value)
            }
            onRemove={() => removeSection(sectionIndex)}
            onAddItem={() => addItem(sectionIndex)}
            onItemUpdate={(itemIndex, field, value) =>
              updateItem(sectionIndex, itemIndex, field, value)
            }
            onItemRemove={(itemIndex) => removeItem(sectionIndex, itemIndex)}
            onImageUpload={(itemIndex, file) =>
              updateItem(sectionIndex, itemIndex, "image", file)
            }
            readOnly={readOnly}
          />
        ))}

        {!readOnly && (
          <Stack spacing={2} direction="row" sx={{ mt: 4 }}>
            <Button onClick={addSection} variant="outlined">
              Add Section
            </Button>
            <Button type="submit" variant="contained" size="large">
              Save Menu
            </Button>
          </Stack>
        )}
      </form>
    </Container>
  );
};

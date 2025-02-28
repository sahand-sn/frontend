import { useState } from "react";
import {
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router";
import { useNotification } from "../context/notification";
import type { AuthContextType } from "~/context/auth";
import type { AxiosError } from "axios";
import type { IError } from "~/types/api";

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

export default function AddMenu() {
  const { authAxios }: AuthContextType = useOutletContext();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Menu>({
    name: "",
    sections: [initialSection],
    description: "",
    location: "",
    contact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await authAxios
      .post<{ message: string; id: string }>("/menu", formData, {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        showNotification(res.data.message, "success");
        navigate(`/menu/${res.data.id}`);
      })
      .catch((error: AxiosError<IError>) => {
        showNotification(
          error.response?.data.error ?? "Could not add menu",
          "error"
        );
      });
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
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [field]: value,
    };
    setFormData({ ...formData, sections: updatedSections });
  };

  // Item handlers
  const addItem = (sectionIndex: number) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].items.push({ ...initialItem });
    setFormData({ ...formData, sections: updatedSections });
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].items = updatedSections[
      sectionIndex
    ].items.filter((_, idx) => idx !== itemIndex);
    setFormData({ ...formData, sections: updatedSections });
  };

  const updateItem = (
    sectionIndex: number,
    itemIndex: number,
    field: keyof Item,
    value: string | string[] | File
  ) => {
    const updatedSections = [...formData.sections];
    const updatedItem = { ...updatedSections[sectionIndex].items[itemIndex] };

    if (field === "ingredients" && Array.isArray(value)) {
      updatedItem.ingredients = value;
    } else if (field === "image" && value instanceof File) {
      updatedItem.image = value;
    } else if (typeof value === "string") {
      updatedItem[field] = value;
    }

    updatedSections[sectionIndex].items[itemIndex] = updatedItem;
    setFormData({ ...formData, sections: updatedSections });
  };

  // Ingredient handlers
  const addIngredient = (sectionIndex: number, itemIndex: number) => {
    const updatedSections = [...formData.sections];
    const ingredients = [
      ...updatedSections[sectionIndex].items[itemIndex].ingredients,
      "",
    ];
    updatedSections[sectionIndex].items[itemIndex].ingredients = ingredients;
    setFormData({ ...formData, sections: updatedSections });
  };

  const updateIngredient = (
    sectionIndex: number,
    itemIndex: number,
    ingIndex: number,
    value: string
  ) => {
    const updatedSections = [...formData.sections];
    const ingredients = [
      ...updatedSections[sectionIndex].items[itemIndex].ingredients,
    ];
    ingredients[ingIndex] = value;
    updatedSections[sectionIndex].items[itemIndex].ingredients = ingredients;
    setFormData({ ...formData, sections: updatedSections });
  };

  // Image handler
  const handleImageUpload = (
    sectionIndex: number,
    itemIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      updateItem(sectionIndex, itemIndex, "image", file);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create New Menu
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Menu Details */}
        <Stack spacing={3} mb={4}>
          <TextField
            label="Menu Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            multiline
            rows={2}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Contact"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              fullWidth
            />
          </Stack>
        </Stack>

        {/* Sections */}
        {formData.sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <Divider sx={{ my: 4 }} />

            <Stack spacing={2} mb={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label="Section Name"
                  value={section.name}
                  onChange={(e) =>
                    updateSection(sectionIndex, "name", e.target.value)
                  }
                  required
                  fullWidth
                />
                <IconButton
                  onClick={() => removeSection(sectionIndex)}
                  color="error"
                  disabled={formData.sections.length === 1}
                >
                  <p>Delete</p>
                </IconButton>
              </Stack>

              {/* Items */}
              {section.items.map((item, itemIndex) => (
                <Stack
                  key={itemIndex}
                  spacing={2}
                  sx={{ p: 2, bgcolor: "background.paper" }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                      label="Item Name"
                      value={item.name}
                      onChange={(e) =>
                        updateItem(
                          sectionIndex,
                          itemIndex,
                          "name",
                          e.target.value
                        )
                      }
                      required
                      fullWidth
                    />
                    <IconButton
                      onClick={() => removeItem(sectionIndex, itemIndex)}
                      color="error"
                      disabled={section.items.length === 1}
                    >
                      <p>Delete</p>
                    </IconButton>
                  </Stack>

                  <TextField
                    label="Description"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(
                        sectionIndex,
                        itemIndex,
                        "description",
                        e.target.value
                      )
                    }
                    multiline
                    rows={2}
                    fullWidth
                  />

                  {/* Ingredients */}
                  <FormControl fullWidth>
                    <InputLabel>Ingredients</InputLabel>
                    <Stack spacing={1} direction="row" flexWrap="wrap">
                      {item.ingredients.map((ingredient, ingIndex) => (
                        <Chip
                          key={ingIndex}
                          label={
                            <TextField
                              value={ingredient}
                              onChange={(e) =>
                                updateIngredient(
                                  sectionIndex,
                                  itemIndex,
                                  ingIndex,
                                  e.target.value
                                )
                              }
                              size="small"
                              required
                            />
                          }
                          onDelete={
                            item.ingredients.length > 1
                              ? () =>
                                  updateIngredient(
                                    sectionIndex,
                                    itemIndex,
                                    ingIndex,
                                    ""
                                  )
                              : undefined
                          }
                        />
                      ))}
                      <Button
                        startIcon={<p>Add</p>}
                        onClick={() => addIngredient(sectionIndex, itemIndex)}
                        size="small"
                      >
                        Add Ingredient
                      </Button>
                    </Stack>
                  </FormControl>

                  {/* Image Upload */}
                  <Button
                    component="label"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/jpeg, image/png, image/webp"
                      onChange={(e) =>
                        handleImageUpload(sectionIndex, itemIndex, e)
                      }
                    />
                  </Button>
                  {item.image && (
                    <Typography variant="caption">
                      Selected: {item.image.name}
                    </Typography>
                  )}
                </Stack>
              ))}

              <Button
                startIcon={<p>Add</p>}
                onClick={() => addItem(sectionIndex)}
                sx={{ alignSelf: "flex-start" }}
              >
                Add Item
              </Button>
            </Stack>
          </div>
        ))}

        <Stack spacing={2} direction="row" sx={{ mt: 4 }}>
          <Button
            startIcon={<p>Add</p>}
            onClick={addSection}
            variant="outlined"
          >
            Add Section
          </Button>
          <Button type="submit" variant="contained" size="large">
            Save Menu
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

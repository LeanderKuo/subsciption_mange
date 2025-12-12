import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import {
  Add,
  Delete,
  Edit,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { useState } from "react";
import {
  SubscriptionCategory,
  SubscriptionCategoryInput,
} from "../types/subscription";
import { useLocale } from "../i18n/LocaleProvider";

interface CategoryManagementDialogProps {
  open: boolean;
  onClose: () => void;
  categories: SubscriptionCategory[];
  onAddCategory: (category: SubscriptionCategoryInput) => Promise<void>;
  onUpdateCategory: (
    id: number,
    updates: Partial<SubscriptionCategoryInput>
  ) => Promise<void>;
  onDeleteCategory: (id: number) => Promise<void>;
}

export const CategoryManagementDialog = ({
  open,
  onClose,
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoryManagementDialogProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    color: "#000000",
  });
  const { t } = useLocale();

  const predefinedColors = [
    "#000000", // Black
    "#FF5733", // Red-Orange
    "#3498DB", // Blue
    "#2ECC71", // Green
    "#9B59B6", // Purple
    "#F39C12", // Orange
    "#E74C3C", // Red
    "#1ABC9C", // Turquoise
  ];

  const handleStartAdd = () => {
    setForm({ name: "", description: "", color: "#000000" });
    setEditingId(null);
    setIsAdding(true);
  };

  const handleStartEdit = (category: SubscriptionCategory) => {
    setForm({
      name: category.name,
      description: category.description || "",
      color: category.color,
    });
    setEditingId(category.id);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;

    try {
      if (editingId) {
        await onUpdateCategory(editingId, form);
      } else {
        await onAddCategory(form);
      }
      setForm({ name: "", description: "", color: "#000000" });
      setEditingId(null);
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  const handleCancel = () => {
    setForm({ name: "", description: "", color: "#000000" });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(t("categoryDialog.deleteConfirm"))) {
      try {
        await onDeleteCategory(id);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") return;
    // Reset form and state when closing the dialog, similar to handleCancel
    setForm({ name: "", description: "", color: "#000000" });
    setEditingId(null);
    setIsAdding(false);
    onClose(); // Call the original onClose prop
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 4,
          background: "rgba(25, 25, 25, 0.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          fontWeight: 700,
          color: "#fff",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <CategoryIcon />
          <span>{t("categoryDialog.title")}</span>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Stack spacing={2}>
          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <Box
              sx={{
                p: 2,
                border: "1px dashed rgba(255, 255, 255, 0.2)",
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <Stack spacing={2}>
                <TextField
                  label={t("categoryDialog.fields.name")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  fullWidth
                  autoFocus
                />

                <TextField
                  label={t("categoryDialog.fields.description")}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  fullWidth
                  multiline
                  rows={2}
                />

                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                      {t("categoryDialog.fields.color")}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {predefinedColors.map((color) => (
                        <Box
                          key={color}
                          onClick={() => setForm({ ...form, color })}
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: color,
                            border:
                              form.color === color
                                ? "2px solid #fff"
                                : "2px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: 1,
                            cursor: "pointer",
                            "&:hover": {
                              transform: "scale(1.1)",
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                      label={t("categoryDialog.fields.customColor")}
                      type="color"
                      value={form.color}
                      onChange={(event) =>
                        setForm({ ...form, color: event.target.value })
                      }
                      sx={{ width: 100 }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {t("categoryDialog.currentColor", {
                        color: form.color.toUpperCase(),
                      })}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    onClick={handleCancel}
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      color: "#fff",
                      "&:hover": { borderColor: "#fff" },
                    }}
                  >
                    {t("categoryDialog.cancel")}
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!form.name.trim()}
                    sx={{
                      backgroundColor: "#34b27b",
                      "&:hover": { backgroundColor: "#2d9969" },
                    }}
                  >
                    {editingId
                      ? t("categoryDialog.update")
                      : t("categoryDialog.add")}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}

          {/* Category List */}
          {categories.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                {t("categoryDialog.empty")}
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {categories.map((category) => (
                <ListItem
                  key={category.id}
                  sx={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 2,
                    mb: 1,
                    backgroundColor:
                      editingId === category.id
                        ? "rgba(52, 178, 123, 0.1)"
                        : "rgba(255, 255, 255, 0.03)",
                  }}
                  secondaryAction={
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        edge="end"
                        onClick={() => handleStartEdit(category)}
                        size="small"
                      >
                        <Edit
                          fontSize="small"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDelete(category.id)}
                        size="small"
                        sx={{ color: "#d32f2f" }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  }
                >
                  <Chip
                    sx={{
                      backgroundColor: category.color,
                      color: "#fff",
                      fontWeight: 600,
                      mr: 2,
                      minWidth: 16,
                      height: 24,
                    }}
                    label=" "
                    size="small"
                  />
                  <ListItemText
                    primary={category.name}
                    secondary={category.description}
                    primaryTypographyProps={{ fontWeight: 600, color: "#fff" }}
                    secondaryTypographyProps={{
                      color: "rgba(255, 255, 255, 0.6)",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", p: 2 }}
      >
        {!isAdding && !editingId && (
          <Button
            startIcon={<Add />}
            onClick={handleStartAdd}
            variant="contained"
            sx={{
              backgroundColor: "#34b27b",
              "&:hover": { backgroundColor: "#2d9969" },
            }}
          >
            {t("categoryDialog.add")}
          </Button>
        )}
        <Box sx={{ flex: 1 }} />
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "rgba(255, 255, 255, 0.2)",
            color: "#fff",
            "&:hover": { borderColor: "#fff" },
          }}
        >
          {t("categoryDialog.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

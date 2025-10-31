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
} from '@mui/material';
import { Add, Delete, Edit, Category as CategoryIcon } from '@mui/icons-material';
import { useState } from 'react';
import { SubscriptionCategory, SubscriptionCategoryInput } from '../types/subscription';

interface CategoryManagementDialogProps {
  open: boolean;
  onClose: () => void;
  categories: SubscriptionCategory[];
  onAddCategory: (category: SubscriptionCategoryInput) => Promise<void>;
  onUpdateCategory: (id: number, updates: Partial<SubscriptionCategoryInput>) => Promise<void>;
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
    name: '',
    description: '',
    color: '#000000',
  });

  const predefinedColors = [
    '#000000', // Black
    '#FF5733', // Red-Orange
    '#3498DB', // Blue
    '#2ECC71', // Green
    '#9B59B6', // Purple
    '#F39C12', // Orange
    '#E74C3C', // Red
    '#1ABC9C', // Turquoise
  ];

  const handleStartAdd = () => {
    setForm({ name: '', description: '', color: '#000000' });
    setEditingId(null);
    setIsAdding(true);
  };

  const handleStartEdit = (category: SubscriptionCategory) => {
    setForm({
      name: category.name,
      description: category.description || '',
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
      setForm({ name: '', description: '', color: '#000000' });
      setEditingId(null);
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  const handleCancel = () => {
    setForm({ name: '', description: '', color: '#000000' });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('確定要刪除此類型嗎？相關訂閱的類型將被移除。')) {
      try {
        await onDeleteCategory(id);
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          border: '2px solid #000',
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: '2px solid #e0e0e0', fontWeight: 700 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <CategoryIcon />
          <span>管理訂閱類型</span>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Stack spacing={2}>
          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <Box
              sx={{
                p: 2,
                border: '2px dashed #000',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
              }}
            >
              <Stack spacing={2}>
                <TextField
                  label="類型名稱"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  fullWidth
                  autoFocus
                />

                <TextField
                  label="描述（選填）"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  fullWidth
                  multiline
                  rows={2}
                />

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    選擇顏色
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
                          border: form.color === color ? '3px solid #000' : '2px solid #ccc',
                          borderRadius: 1,
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button onClick={handleCancel} variant="outlined">
                    取消
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!form.name.trim()}
                    sx={{
                      backgroundColor: '#000',
                      '&:hover': { backgroundColor: '#333' },
                    }}
                  >
                    {editingId ? '更新' : '新增'}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}

          {/* Category List */}
          {categories.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                尚未建立任何類型
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {categories.map((category) => (
                <ListItem
                  key={category.id}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    mb: 1,
                    backgroundColor: editingId === category.id ? '#f0f0f0' : '#fff',
                  }}
                  secondaryAction={
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        edge="end"
                        onClick={() => handleStartEdit(category)}
                        size="small"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDelete(category.id)}
                        size="small"
                        sx={{ color: '#d32f2f' }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  }
                >
                  <Chip
                    sx={{
                      backgroundColor: category.color,
                      color: '#fff',
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
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ borderTop: '2px solid #e0e0e0', p: 2 }}>
        {!isAdding && !editingId && (
          <Button
            startIcon={<Add />}
            onClick={handleStartAdd}
            variant="contained"
            sx={{
              backgroundColor: '#000',
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            新增類型
          </Button>
        )}
        <Box sx={{ flex: 1 }} />
        <Button onClick={onClose} variant="outlined">
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};

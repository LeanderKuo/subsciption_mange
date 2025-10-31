import {
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import { SubscriptionInput, SubscriptionCategory } from '../types/subscription';
import {
  calculateEndDate,
  getDefaultCycle,
} from '../utils/subscriptionDates';
import { useBrandAutofill, BrandAutofillResult } from '../hooks/useBrandAutofill';

interface AddSubscriptionDialogProps {
  onAdd: (payload: SubscriptionInput) => Promise<void> | void;
  disabled?: boolean;
  categories?: SubscriptionCategory[];
}

type FormState = {
  name: string;
  brand: string;
  price: string;
  currency: string;
  startDate: string;
  endDate: string;
  cycle: SubscriptionInput['cycle'];
  iconUrl: string;
  autoRenew: boolean;
  categoryId: number | null;
};

const createDefaultFormState = (): FormState => {
  const today = new Date().toISOString().split('T')[0];
  const cycle = getDefaultCycle();
  return {
    name: '',
    brand: '',
    price: '',
    currency: 'TWD',
    startDate: today,
    endDate: calculateEndDate(today, cycle),
    cycle,
    iconUrl: '',
    autoRenew: false,
    categoryId: null,
  };
};

export const AddSubscriptionDialog = ({ onAdd, disabled, categories = [] }: AddSubscriptionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => createDefaultFormState());
  const autoFilledIconRef = useRef<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<BrandAutofillResult | null>(null);
  const brandAutofill = useBrandAutofill(form.brand);

  const handleBrandInputChange = (
    _event: SyntheticEvent<Element, Event>,
    newInputValue: string,
    reason: AutocompleteInputChangeReason
  ) => {
    setForm((prev) => ({
      ...prev,
      brand: newInputValue,
    }));

    if (reason === 'input' || reason === 'clear') {
      setSelectedBrand(null);
      autoFilledIconRef.current = null;
      brandAutofill.reset();
    }
  };

  const handleBrandSelect = (
    _event: unknown,
    newValue: BrandAutofillResult | string | null
  ) => {
    if (!newValue || typeof newValue === 'string') {
      setSelectedBrand(null);
      return;
    }

    setSelectedBrand(newValue);

    setForm((prev) => {
      const next: FormState = { ...prev };
      const suggestedBrand = newValue.name ?? newValue.domain ?? prev.brand;
      next.brand = suggestedBrand;

      if (newValue.iconUrl) {
        if (!prev.iconUrl || prev.iconUrl === autoFilledIconRef.current) {
          next.iconUrl = newValue.iconUrl;
          autoFilledIconRef.current = newValue.iconUrl;
        }
      }

      return next;
    });
  };

  const handleChange =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setForm((prev) => {
        const next = {
          ...prev,
          [field]: value,
        } as FormState;

        if (field === 'startDate' || field === 'cycle') {
          const startDate = field === 'startDate' ? value : next.startDate;
          const cycle =
            (field === 'cycle' ? (value as SubscriptionInput['cycle']) : next.cycle) ||
            getDefaultCycle();
          const autoEndDate = calculateEndDate(startDate, cycle);
          if (autoEndDate) {
            next.endDate = autoEndDate;
          }
        }

        return next;
      });
    };

  const handleSubmit = async () => {
    const payload: SubscriptionInput = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      price: Number(form.price) || 0,
      currency: form.currency,
      startDate: form.startDate,
      endDate: form.endDate,
      cycle: form.cycle,
      iconUrl: form.iconUrl ? form.iconUrl.trim() : null,
      autoRenew: form.autoRenew,
      categoryId: form.categoryId,
    };

    if (!payload.name || !payload.brand) {
      return;
    }

    await onAdd({
      ...payload,
    });
    setForm(createDefaultFormState());
    autoFilledIconRef.current = null;
    setSelectedBrand(null);
    brandAutofill.reset();
    setOpen(false);
  };

  const handleOpen = () => {
    brandAutofill.reset();
    autoFilledIconRef.current = null;
    setSelectedBrand(null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setForm(createDefaultFormState());
    autoFilledIconRef.current = null;
    setSelectedBrand(null);
    brandAutofill.reset();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} disabled={disabled}>
        新增訂閱
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>新增訂閱服務</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="服務名稱"
              value={form.name}
              onChange={handleChange('name')}
              fullWidth
              required
            />
            <Autocomplete<BrandAutofillResult, false, false, true>
              freeSolo
              fullWidth
              options={brandAutofill.suggestions}
              value={selectedBrand}
              inputValue={form.brand}
              onInputChange={handleBrandInputChange}
              onChange={handleBrandSelect}
              loading={brandAutofill.isLoading}
              filterOptions={(options) => options}
              getOptionLabel={(option) =>
                typeof option === 'string'
                  ? option
                  : option.name ?? option.domain ?? option.query
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              noOptionsText={form.brand.trim() ? '找不到相關品牌' : '請輸入品牌名稱'}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                const displayName = option.name ?? option.domain ?? option.query;
                const subtitle =
                  option.domain && option.domain !== option.name ? option.domain : null;
                const initial = displayName ? displayName.charAt(0).toUpperCase() : '?';

                return (
                  <li {...optionProps} key={key ?? option.id}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        src={option.iconUrl}
                        alt={displayName}
                        sx={{ width: 28, height: 28 }}
                      >
                        {initial}
                      </Avatar>
                      <Stack spacing={0}>
                        <Typography variant="body2">{displayName}</Typography>
                        {subtitle && (
                          <Typography variant="caption" color="text.secondary">
                            {subtitle}
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="品牌"
                  required
                  error={Boolean(brandAutofill.error)}
                  helperText={
                    brandAutofill.enabled
                      ? brandAutofill.error ??
                        (brandAutofill.isLoading ? '搜尋品牌中…' : undefined)
                      : undefined
                  }
                />
              )}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="價格"
                type="number"
                value={form.price}
                onChange={handleChange('price')}
                fullWidth
                required
              />
              <TextField
                label="貨幣"
                select
                value={form.currency}
                onChange={handleChange('currency')}
                fullWidth
                required
              >
                <MenuItem value="TWD">TWD - 新台幣</MenuItem>
                <MenuItem value="USD">USD - 美元</MenuItem>
                <MenuItem value="EUR">EUR - 歐元</MenuItem>
                <MenuItem value="JPY">JPY - 日圓</MenuItem>
                <MenuItem value="GBP">GBP - 英鎊</MenuItem>
                <MenuItem value="CNY">CNY - 人民幣</MenuItem>
              </TextField>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="開始日期"
                type="date"
                value={form.startDate}
                onChange={handleChange('startDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="結束日期"
                type="date"
                value={form.endDate}
                onChange={handleChange('endDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Stack>
            <TextField
              label="計算周期"
              select
              value={form.cycle}
              onChange={handleChange('cycle')}
              fullWidth
              required
            >
              <MenuItem value="30days">30天</MenuItem>
              <MenuItem value="6months">6個月</MenuItem>
              <MenuItem value="1year">1年</MenuItem>
            </TextField>
            <TextField
              label="Icon URL（選填）"
              value={form.iconUrl}
              onChange={handleChange('iconUrl')}
              fullWidth
              placeholder="https://"
            />
            <TextField
              label="訂閱類型（選填）"
              select
              value={form.categoryId ?? ''}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value ? Number(e.target.value) : null })}
              fullWidth
            >
              <MenuItem value="">無類型</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip
                      sx={{
                        backgroundColor: category.color,
                        color: '#fff',
                        width: 16,
                        height: 16,
                      }}
                      label=" "
                      size="small"
                    />
                    <span>{category.name}</span>
                  </Stack>
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.autoRenew}
                  onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
                  sx={{ color: '#000', '&.Mui-checked': { color: '#000' } }}
                />
              }
              label="自動續訂"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button variant="contained" onClick={handleSubmit}>
            新增
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

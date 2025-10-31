import {
  Autocomplete,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import type { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import { Subscription } from '../types/subscription';
import { calculateEndDate } from '../utils/subscriptionDates';
import { useBrandAutofill, BrandAutofillResult } from '../hooks/useBrandAutofill';

interface EditSubscriptionDialogProps {
  subscription: Subscription;
  onSave: (subscription: Subscription) => Promise<void> | void;
}

type FormState = {
  name: string;
  brand: string;
  price: string;
  currency: string;
  startDate: string;
  endDate: string;
  cycle: Subscription['cycle'];
  iconUrl: string;
};

const toFormState = (subscription: Subscription): FormState => ({
  name: subscription.name,
  brand: subscription.brand,
  price: subscription.price.toString(),
  currency: subscription.currency,
  startDate: subscription.startDate,
  endDate: subscription.endDate,
  cycle: subscription.cycle,
  iconUrl: subscription.iconUrl ?? '',
});

export const EditSubscriptionDialog = ({
  subscription,
  onSave,
}: EditSubscriptionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => toFormState(subscription));
  const [brandTouched, setBrandTouched] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandAutofillResult | null>(null);
  const autoFilledIconRef = useRef<string | null>(null);

  const brandAutofill = useBrandAutofill(brandTouched ? form.brand : '');

  const handleBrandInputChange = (
    _event: SyntheticEvent<Element, Event>,
    newInputValue: string,
    reason: AutocompleteInputChangeReason
  ) => {
    setForm((prev) => ({
      ...prev,
      brand: newInputValue,
    }));

    if (reason === 'input') {
      setBrandTouched(true);
      setSelectedBrand(null);
      autoFilledIconRef.current = null;
      brandAutofill.reset();
    }

    if (reason === 'clear') {
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
    setBrandTouched(true);

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
          const cycle = (field === 'cycle' ? value : next.cycle) as Subscription['cycle'];
          const autoEndDate = calculateEndDate(startDate, cycle);
          if (autoEndDate) {
            next.endDate = autoEndDate;
          }
        }

        return next;
      });
    };

  const handleSubmit = async () => {
    const payload: Subscription = {
      ...subscription,
      name: form.name.trim(),
      brand: form.brand.trim(),
      price: Number(form.price) || 0,
      currency: form.currency,
      startDate: form.startDate,
      endDate: form.endDate,
      cycle: form.cycle,
      iconUrl: form.iconUrl ? form.iconUrl.trim() : null,
    };

    await onSave(payload);
    setOpen(false);
    setBrandTouched(false);
    setSelectedBrand(null);
    autoFilledIconRef.current = null;
    brandAutofill.reset();
  };

  const handleOpen = () => {
    setForm(toFormState(subscription));
    setBrandTouched(false);
    setSelectedBrand(null);
    autoFilledIconRef.current = subscription.iconUrl ?? null;
    brandAutofill.reset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBrandTouched(false);
    setSelectedBrand(null);
    autoFilledIconRef.current = null;
    brandAutofill.reset();
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen} aria-label="編輯">
        <EditIcon fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>編輯訂閱服務</DialogTitle>
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
              options={brandTouched ? brandAutofill.suggestions : []}
              value={selectedBrand}
              inputValue={form.brand}
              onInputChange={handleBrandInputChange}
              onChange={handleBrandSelect}
              loading={brandTouched && brandAutofill.isLoading}
              filterOptions={(options) => options}
              getOptionLabel={(option) =>
                typeof option === 'string'
                  ? option
                  : option.name ?? option.domain ?? option.query
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              noOptionsText={
                form.brand.trim() ? '找不到相關品牌' : '請輸入品牌名稱'
              }
              renderOption={(props, option) => {
                const displayName = option.name ?? option.domain ?? option.query;
                const subtitle =
                  option.domain && option.domain !== option.name ? option.domain : null;
                const initial = displayName ? displayName.charAt(0).toUpperCase() : '?';

                return (
                  <li {...props}>
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
                  error={Boolean(brandAutofill.error) && brandTouched}
                  helperText={
                    brandAutofill.enabled && brandTouched
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
                <MenuItem value="TWD">TWD</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button variant="contained" onClick={handleSubmit}>
            更新
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

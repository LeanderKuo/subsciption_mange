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
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import {
  SubscriptionInput,
  SubscriptionCategory,
} from '../types/subscription';
import { useBrandAutofill, BrandAutofillResult } from '../hooks/useBrandAutofill';
import { useLocale } from '../i18n/LocaleProvider';
import {
  createBlankSubscriptionFormState,
  type SubscriptionFormStateBase,
} from '../utils/subscriptionFormState';
import { BillingPeriod, serializeBillingCycle } from '../utils/billingUtils';

interface AddSubscriptionDialogProps {
  onAdd: (payload: SubscriptionInput) => Promise<void> | void;
  disabled?: boolean;
  categories?: SubscriptionCategory[];
}

type FormState = SubscriptionFormStateBase & {
  billingPeriod: BillingPeriod;
  customYears: string;
  customMonths: string;
};

const createExtendedBlankFormState = (): FormState => ({
  ...createBlankSubscriptionFormState(),
  billingPeriod: 'monthly',
  customYears: '0',
  customMonths: '1',
});

export const AddSubscriptionDialog = ({ onAdd, disabled, categories = [] }: AddSubscriptionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(createExtendedBlankFormState);
  const autoFilledIconRef = useRef<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<BrandAutofillResult | null>(null);
  const brandAutofill = useBrandAutofill(form.brand);
  const { t } = useLocale();

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

      if (field === 'startDate') {
        setForm((prev) => ({
          ...prev,
          startDate: value,
        }));
        return;
      }

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  const handleBillingPeriodChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      billingPeriod: event.target.value as BillingPeriod,
    }));
  };

  const handleSubmit = async () => {
    const customDuration =
      form.billingPeriod === 'custom'
        ? {
            years: Number(form.customYears) || 0,
            months: Number(form.customMonths) || 0,
          }
        : undefined;

    const resolvedCycle = serializeBillingCycle(form.billingPeriod, customDuration);

    const payload: SubscriptionInput = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      price: Number(form.price) || 0,
      currency: form.currency,
      startDate: form.startDate,
      endDate: form.endDate,
      cycle: resolvedCycle,
      billingPeriod: form.billingPeriod,
      customDuration,
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
    setForm(createExtendedBlankFormState());
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
  const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick") return;
    setOpen(false);
    setForm(createExtendedBlankFormState());
    autoFilledIconRef.current = null;
    setSelectedBrand(null);
    brandAutofill.reset();
  };

  const handleCancel = () => {
    setOpen(false);
    setForm(createExtendedBlankFormState());
    autoFilledIconRef.current = null;
    setSelectedBrand(null);
    brandAutofill.reset();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} disabled={disabled}>
        {t('addSubscription.openButton')}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t('addSubscription.title')}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label={t('addSubscription.fields.name')}
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
              noOptionsText={
                form.brand.trim()
                  ? t('addSubscription.brand.noResults')
                  : t('addSubscription.brand.placeholder')
              }
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
                  label={t('addSubscription.fields.brand')}
                  required
                  error={Boolean(brandAutofill.error)}
                  helperText={
                    brandAutofill.enabled
                      ? brandAutofill.error ??
                        (brandAutofill.isLoading ? t('addSubscription.brand.searching') : undefined)
                      : undefined
                  }
                />
              )}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('addSubscription.fields.price')}
                type="number"
                value={form.price}
                onChange={handleChange('price')}
                fullWidth
                required
              />
              <TextField
                label={t('addSubscription.fields.currency')}
                select
                value={form.currency}
                onChange={handleChange('currency')}
                fullWidth
                required
              >
                <MenuItem value="TWD">{t('currency.TWD')}</MenuItem>
                <MenuItem value="USD">{t('currency.USD')}</MenuItem>
                <MenuItem value="EUR">{t('currency.EUR')}</MenuItem>
                <MenuItem value="JPY">{t('currency.JPY')}</MenuItem>
                <MenuItem value="GBP">{t('currency.GBP')}</MenuItem>
                <MenuItem value="CNY">{t('currency.CNY')}</MenuItem>
              </TextField>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('addSubscription.fields.startDate')}
                type="date"
                value={form.startDate}
                onChange={handleChange('startDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label={t('addSubscription.fields.endDate')}
                type="date"
                value={form.endDate}
                onChange={handleChange('endDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Stack>
            
            <FormControl component="fieldset" fullWidth>
              <FormLabel>{t('addSubscription.fields.billingCycle')}</FormLabel>
              <RadioGroup
                row
                value={form.billingPeriod}
                onChange={handleBillingPeriodChange}
                name="billing-period"
              >
                <FormControlLabel
                  value="monthly"
                  control={<Radio />}
                  label={t('billingCycle.monthly')}
                />
                <FormControlLabel
                  value="half-yearly"
                  control={<Radio />}
                  label={t('billingCycle.halfYearly')}
                />
                <FormControlLabel
                  value="yearly"
                  control={<Radio />}
                  label={t('billingCycle.yearly')}
                />
                <FormControlLabel
                  value="custom"
                  control={<Radio />}
                  label={t('billingCycle.custom')}
                />
              </RadioGroup>
            </FormControl>

            {form.billingPeriod === 'custom' && (
              <Stack direction="row" spacing={2}>
                <TextField
                  label={t('addSubscription.cycle.customUnit.years')}
                  type="number"
                  value={form.customYears}
                  onChange={handleChange('customYears')}
                  fullWidth
                  inputProps={{ min: 0 }}
                />
                <TextField
                  label={t('addSubscription.cycle.customUnit.months')}
                  type="number"
                  value={form.customMonths}
                  onChange={handleChange('customMonths')}
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              </Stack>
            )}

            <TextField
              label={t('addSubscription.fields.iconUrl')}
              value={form.iconUrl}
              onChange={handleChange('iconUrl')}
              fullWidth
              placeholder="https://"
            />
            <TextField
              label={t('addSubscription.fields.category')}
              select
              value={form.categoryId ?? ''}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value ? Number(e.target.value) : null })}
              fullWidth
            >
              <MenuItem value="">{t('addSubscription.fields.category.none')}</MenuItem>
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
              label={t('addSubscription.fields.autoRenew')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{t('addSubscription.cancel')}</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {t('addSubscription.submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

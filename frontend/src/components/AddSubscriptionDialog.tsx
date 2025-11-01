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
  CycleUnit,
  BillingCycle,
  PresetBillingCycle,
} from '../types/subscription';
import { getDefaultCycle, buildCustomCycle, isPresetCycle } from '../utils/subscriptionDates';
import { useBrandAutofill, BrandAutofillResult } from '../hooks/useBrandAutofill';
import { useLocale } from '../i18n/LocaleProvider';
import {
  createBlankSubscriptionFormState,
  createCycleAwareUpdater,
  deriveCycleState,
  resolveCycleFromState,
  sanitizeCustomValue,
  type CycleMode,
  type SubscriptionFormStateBase,
} from '../utils/subscriptionFormState';

interface AddSubscriptionDialogProps {
  onAdd: (payload: SubscriptionInput) => Promise<void> | void;
  disabled?: boolean;
  categories?: SubscriptionCategory[];
}

type FormState = SubscriptionFormStateBase;

export const AddSubscriptionDialog = ({ onAdd, disabled, categories = [] }: AddSubscriptionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(createBlankSubscriptionFormState);
  const autoFilledIconRef = useRef<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<BrandAutofillResult | null>(null);
  const brandAutofill = useBrandAutofill(form.brand);
  const { t } = useLocale();
  const applyCycleUpdate = createCycleAwareUpdater<FormState>(setForm);

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
        applyCycleUpdate((prev) => ({
          ...prev,
          startDate: value,
        }));
        return;
      }

      if (field === 'cycle') {
        const cycleValue = (value as BillingCycle) || getDefaultCycle();
        const cycleState = deriveCycleState(cycleValue);
        applyCycleUpdate((prev) => ({
          ...prev,
          cycle: cycleValue,
          cycleMode: cycleState.cycleMode,
          customUnit: cycleState.customUnit,
          customValue: cycleState.customValue,
        }));
        return;
      }

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleCycleModeChange = (_event: ChangeEvent<HTMLInputElement>, value: string) => {
    if (value !== 'preset' && value !== 'custom') {
      return;
    }

    const mode = value as CycleMode;

    applyCycleUpdate((prev) => {
      if (mode === 'preset') {
        const preset = isPresetCycle(prev.cycle) ? prev.cycle : getDefaultCycle();
        const presetState = deriveCycleState(preset);
        return {
          ...prev,
          cycleMode: mode,
          cycle: preset,
          customUnit: presetState.customUnit,
          customValue: presetState.customValue,
        };
      }

      const amount = Number(prev.customValue) || 1;
      return {
        ...prev,
        cycleMode: mode,
        cycle: buildCustomCycle(prev.customUnit, amount),
      };
    });
  };

  const handlePresetCycleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value as PresetBillingCycle;
    applyCycleUpdate((prev) => ({
      ...prev,
      cycleMode: 'preset',
      cycle: value,
    }));
  };

  const handleCustomValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const amount = sanitizeCustomValue(event.target.value);
    applyCycleUpdate((prev) => ({
      ...prev,
      cycleMode: 'custom',
      customValue: amount,
      cycle: buildCustomCycle(prev.customUnit, Number(amount)),
    }));
  };

  const handleCustomUnitChange = (event: ChangeEvent<HTMLInputElement>) => {
    const unit = event.target.value as CycleUnit;
    applyCycleUpdate((prev) => {
      const amount = Number(prev.customValue) || 1;
      return {
        ...prev,
        cycleMode: 'custom',
        customUnit: unit,
        cycle: buildCustomCycle(unit, amount),
      };
    });
  };

  const handleSubmit = async () => {
    const resolvedCycle = resolveCycleFromState(
      form.cycleMode,
      form.cycle,
      form.customUnit,
      form.customValue
    );

    const payload: SubscriptionInput = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      price: Number(form.price) || 0,
      currency: form.currency,
      startDate: form.startDate,
      endDate: form.endDate,
      cycle: resolvedCycle,
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
    setForm(createBlankSubscriptionFormState());
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
    setForm(createBlankSubscriptionFormState());
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
                value={form.cycleMode}
                onChange={handleCycleModeChange}
                name="billing-cycle-mode"
              >
                <FormControlLabel
                  value="preset"
                  control={<Radio />}
                  label={t('addSubscription.cycle.mode.preset')}
                />
                <FormControlLabel
                  value="custom"
                  control={<Radio />}
                  label={t('addSubscription.cycle.mode.custom')}
                />
              </RadioGroup>
            </FormControl>
            {form.cycleMode === 'preset' ? (
              <TextField
                select
                value={isPresetCycle(form.cycle) ? form.cycle : getDefaultCycle()}
                onChange={handlePresetCycleChange}
                fullWidth
              >
                <MenuItem value="30days">{t('billingCycle.30days')}</MenuItem>
                <MenuItem value="6months">{t('billingCycle.6months')}</MenuItem>
                <MenuItem value="1year">{t('billingCycle.1year')}</MenuItem>
              </TextField>
            ) : (
              <Stack direction="row" spacing={2}>
                <TextField
                  label={t('addSubscription.cycle.customValue')}
                  type="number"
                  value={form.customValue}
                  onChange={handleCustomValueChange}
                  fullWidth
                  inputProps={{ min: 1 }}
                />
                <TextField
                  label={t('addSubscription.cycle.customUnit')}
                  select
                  value={form.customUnit}
                  onChange={handleCustomUnitChange}
                  fullWidth
                >
                  <MenuItem value="days">{t('addSubscription.cycle.customUnit.days')}</MenuItem>
                  <MenuItem value="months">{t('addSubscription.cycle.customUnit.months')}</MenuItem>
                  <MenuItem value="years">{t('addSubscription.cycle.customUnit.years')}</MenuItem>
                </TextField>
              </Stack>
            )}
            <FormHelperText sx={{ color: 'text.secondary', ml: 0.5 }}>
              {t('addSubscription.cycle.helper')}
            </FormHelperText>
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
          <Button onClick={handleClose}>{t('addSubscription.cancel')}</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {t('addSubscription.submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

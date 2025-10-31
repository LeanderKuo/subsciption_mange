import {
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import type { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import {
  Subscription,
  SubscriptionCategory,
  BillingCycle,
  CycleUnit,
  PresetBillingCycle,
} from '../types/subscription';
import {
  calculateEndDate,
  buildCustomCycle,
  isCustomCycle,
  isPresetCycle,
  parseCustomCycle,
  getDefaultCycle,
} from '../utils/subscriptionDates';
import { useBrandAutofill, BrandAutofillResult } from '../hooks/useBrandAutofill';
import { useLocale } from '../i18n/LocaleProvider';

interface EditSubscriptionDialogProps {
  subscription: Subscription;
  onSave: (subscription: Subscription) => Promise<void> | void;
  categories?: SubscriptionCategory[];
}

type FormState = {
  name: string;
  brand: string;
  price: string;
  currency: string;
  startDate: string;
  endDate: string;
  cycle: Subscription['cycle'];
  cycleMode: 'preset' | 'custom';
  customUnit: CycleUnit;
  customValue: string;
  iconUrl: string;
  autoRenew: boolean;
  recordPriceChange: boolean;
  priceChangeDate: string;
  categoryId: number | null;
};

type CycleMode = 'preset' | 'custom';

const defaultCustomUnit: CycleUnit = 'months';

const deriveCycleState = (
  cycle: BillingCycle
): { cycleMode: CycleMode; customUnit: CycleUnit; customValue: string } => {
  if (isCustomCycle(cycle)) {
    const { unit, amount } = parseCustomCycle(cycle);
    return {
      cycleMode: 'custom',
      customUnit: unit,
      customValue: String(amount),
    };
  }

  return {
    cycleMode: 'preset',
    customUnit: defaultCustomUnit,
    customValue: '1',
  };
};

const toFormState = (subscription: Subscription): FormState => {
  const cycleState = deriveCycleState(subscription.cycle);
  return {
    name: subscription.name,
    brand: subscription.brand,
    price: subscription.price.toString(),
    currency: subscription.currency,
    startDate: subscription.startDate,
    endDate: subscription.endDate,
    cycle: subscription.cycle,
    cycleMode: cycleState.cycleMode,
    customUnit: cycleState.customUnit,
    customValue: cycleState.customValue,
    iconUrl: subscription.iconUrl ?? '',
    autoRenew: subscription.autoRenew ?? false,
    recordPriceChange: false,
    priceChangeDate: new Date().toISOString().split('T')[0],
    categoryId: subscription.categoryId ?? null,
  };
};

export const EditSubscriptionDialog = ({
  subscription,
  onSave,
  categories = [],
}: EditSubscriptionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => toFormState(subscription));
  const [brandTouched, setBrandTouched] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandAutofillResult | null>(null);
  const autoFilledIconRef = useRef<string | null>(null);

  const brandAutofill = useBrandAutofill(brandTouched ? form.brand : '');
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

      if (field === 'startDate') {
        setForm((prev) => {
          const next: FormState = {
            ...prev,
            startDate: value,
          };
          const autoEndDate = calculateEndDate(value, next.cycle);
          if (autoEndDate) {
            next.endDate = autoEndDate;
          }
          return next;
        });
        return;
      }

      if (field === 'cycle') {
        const cycleValue = (value as BillingCycle) || getDefaultCycle();
        const cycleState = deriveCycleState(cycleValue);
        setForm((prev) => {
          const next: FormState = {
            ...prev,
            cycle: cycleValue,
            cycleMode: cycleState.cycleMode,
            customUnit: cycleState.customUnit,
            customValue: cycleState.customValue,
          };
          const autoEndDate = calculateEndDate(next.startDate, cycleValue);
          if (autoEndDate) {
            next.endDate = autoEndDate;
          }
          return next;
        });
        return;
      }

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const applyCycleUpdate = (updater: (prev: FormState) => FormState) => {
    setForm((prev) => {
      const next = updater(prev);
      const autoEndDate = calculateEndDate(next.startDate, next.cycle);
      if (autoEndDate) {
        next.endDate = autoEndDate;
      }
      return next;
    });
  };

  const handleCycleModeChange = (_event: ChangeEvent<HTMLInputElement>, value: string) => {
    if (value !== 'preset' && value !== 'custom') {
      return;
    }

    applyCycleUpdate((prev) => {
      const next: FormState = { ...prev, cycleMode: value as CycleMode };
      if (value === 'preset') {
        const preset = isPresetCycle(prev.cycle) ? prev.cycle : getDefaultCycle();
        next.cycle = preset;
      } else {
        const amount = Number(prev.customValue) || 1;
        next.cycle = buildCustomCycle(prev.customUnit, amount);
      }
      return next;
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
    const parsed = Number(event.target.value);
    const amount = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
    applyCycleUpdate((prev) => ({
      ...prev,
      cycleMode: 'custom',
      customValue: String(amount),
      cycle: buildCustomCycle(prev.customUnit, amount),
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
    const newPrice = Number(form.price) || 0;
    const oldPrice = subscription.price;
    const priceChanged = newPrice !== oldPrice;

    const resolvedCycle =
      form.cycleMode === 'custom'
        ? buildCustomCycle(form.customUnit, Number(form.customValue) || 1)
        : (isPresetCycle(form.cycle) ? form.cycle : getDefaultCycle());

    const payload: Subscription = {
      ...subscription,
      name: form.name.trim(),
      brand: form.brand.trim(),
      price: newPrice,
      currency: form.currency,
      startDate: form.startDate,
      endDate: form.endDate,
      cycle: resolvedCycle,
      iconUrl: form.iconUrl ? form.iconUrl.trim() : null,
      autoRenew: form.autoRenew,
      categoryId: form.categoryId,
    };

    // TODO: If recordPriceChange is true and price changed, create price_changes record
    // This will be implemented in the service layer
    if (form.recordPriceChange && priceChanged) {
      console.log('Price change recorded:', {
        oldPrice,
        newPrice,
        effectiveDate: form.priceChangeDate,
      });
    }

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
    setForm(toFormState(subscription));
    setBrandTouched(false);
    setSelectedBrand(null);
    autoFilledIconRef.current = null;
    brandAutofill.reset();
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
        aria-label={t('editSubscription.openButton')}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t('editSubscription.title')}</DialogTitle>
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
                form.brand.trim()
                  ? t('addSubscription.brand.noResults')
                  : t('addSubscription.brand.placeholder')
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
                  label={t('addSubscription.fields.brand')}
                  required
                  error={Boolean(brandAutofill.error) && brandTouched}
                  helperText={
                    brandAutofill.enabled && brandTouched
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
              onChange={(e) =>
                setForm({
                  ...form,
                  categoryId: e.target.value ? Number(e.target.value) : null,
                })
              }
              fullWidth
            >
              <MenuItem value="">{t('addSubscription.fields.category.none')}</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.recordPriceChange}
                  onChange={(e) => setForm({ ...form, recordPriceChange: e.target.checked })}
                  sx={{ color: '#000', '&.Mui-checked': { color: '#000' } }}
                />
              }
              label={t('editSubscription.recordPriceChange')}
            />
            {form.recordPriceChange && (
              <TextField
                label={t('editSubscription.priceEffectiveDate')}
                type="date"
                value={form.priceChangeDate}
                onChange={(e) => setForm({ ...form, priceChangeDate: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
                helperText={
                  Number(form.price) !== subscription.price
                    ? t('editSubscription.priceChangePreview', {
                        oldPrice: `${subscription.currency} ${subscription.price}`,
                        newPrice: `${form.currency} ${form.price}`,
                      })
                    : t('editSubscription.priceChangeHint')
                }
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('addSubscription.cancel')}</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {t('editSubscription.submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

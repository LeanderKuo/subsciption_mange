import { addDays, addMonths, addYears, format } from 'date-fns';
import {
  BillingCycle,
  CustomBillingCycle,
  CycleUnit,
  PresetBillingCycle,
  SubscriptionInput,
} from '../types/subscription';

const presetCycleMap: Record<PresetBillingCycle, { unit: CycleUnit; amount: number }> = {
  '30days': { unit: 'days', amount: 30 },
  '6months': { unit: 'months', amount: 6 },
  '1year': { unit: 'years', amount: 1 },
};

const presetDurationMap: Record<PresetBillingCycle, { months: number; days: number }> = {
  '30days': { months: 1, days: 30 },
  '6months': { months: 6, days: 182 },
  '1year': { months: 12, days: 365 },
};

const sanitizeAmount = (amount: number): number => {
  if (!Number.isFinite(amount) || amount <= 0) {
    return 1;
  }
  return Math.max(1, Math.floor(amount));
};

export const isPresetCycle = (cycle: BillingCycle): cycle is PresetBillingCycle =>
  cycle === '30days' || cycle === '6months' || cycle === '1year';

export const isCustomCycle = (cycle: BillingCycle): cycle is CustomBillingCycle =>
  cycle.startsWith('custom:');

export const parseCustomCycle = (
  cycle: CustomBillingCycle
): { unit: CycleUnit; amount: number } => {
  const [, rawUnit, rawAmount] = cycle.split(':');
  const unit: CycleUnit = rawUnit === 'days' || rawUnit === 'years' ? rawUnit : 'months';
  const amount = sanitizeAmount(Number.parseInt(rawAmount ?? '1', 10));
  return { unit, amount };
};

export const buildCustomCycle = (unit: CycleUnit, amount: number): CustomBillingCycle => {
  return `custom:${unit}:${sanitizeAmount(amount)}`;
};

const addInterval = (date: Date, unit: CycleUnit, amount: number): Date => {
  switch (unit) {
    case 'days':
      return addDays(date, amount);
    case 'months':
      return addMonths(date, amount);
    case 'years':
      return addYears(date, amount);
    default:
      return addMonths(date, amount);
  }
};

export const calculateEndDate = (startDate: string, cycle: BillingCycle): string => {
  if (!startDate) return '';

  const parsedDate = new Date(startDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  if (isPresetCycle(cycle)) {
    const preset = presetCycleMap[cycle] ?? presetCycleMap['30days'];
    return format(addInterval(parsedDate, preset.unit, preset.amount), 'yyyy-MM-dd');
  }

  const custom = parseCustomCycle(cycle);
  return format(addInterval(parsedDate, custom.unit, custom.amount), 'yyyy-MM-dd');
};

export const getDefaultCycle = (): PresetBillingCycle => '30days';

const toMonths = (unit: CycleUnit, amount: number): number => {
  switch (unit) {
    case 'days':
      return amount / 30;
    case 'years':
      return amount * 12;
    default:
      return amount;
  }
};

const toDays = (unit: CycleUnit, amount: number): number => {
  switch (unit) {
    case 'months':
      return amount * 30;
    case 'years':
      return amount * 365;
    default:
      return amount;
  }
};

export const getCycleDurationInMonths = (cycle: BillingCycle): number => {
  if (isPresetCycle(cycle)) {
    return presetDurationMap[cycle]?.months ?? 1;
  }

  const { unit, amount } = parseCustomCycle(cycle);
  return toMonths(unit, amount);
};

export const getCycleDurationInDays = (cycle: BillingCycle): number => {
  if (isPresetCycle(cycle)) {
    return presetDurationMap[cycle]?.days ?? 30;
  }
  const { unit, amount } = parseCustomCycle(cycle);
  return toDays(unit, amount);
};

export const createDefaultSubscriptionInput = (): SubscriptionInput => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const cycle = getDefaultCycle();

  return {
    name: '',
    brand: '',
    price: 0,
    currency: 'TWD',
    startDate: today,
    endDate: calculateEndDate(today, cycle),
    cycle,
    iconUrl: '',
  };
};

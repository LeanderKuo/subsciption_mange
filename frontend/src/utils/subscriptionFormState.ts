import type { Dispatch, SetStateAction } from 'react';
import type {
  BillingCycle,
  CycleUnit,
  Subscription,
} from '../types/subscription';
import {
  buildCustomCycle,
  calculateEndDate,
  getDefaultCycle,
  isCustomCycle,
  isPresetCycle,
  parseCustomCycle,
} from './subscriptionDates';

export type CycleMode = 'preset' | 'custom';

export const DEFAULT_CUSTOM_UNIT: CycleUnit = 'months';

export interface SubscriptionFormStateBase {
  name: string;
  brand: string;
  price: string;
  currency: string;
  startDate: string;
  endDate: string;
  cycle: BillingCycle;
  cycleMode: CycleMode;
  customUnit: CycleUnit;
  customValue: string;
  iconUrl: string;
  autoRenew: boolean;
  categoryId: number | null;
}

export type CycleAwareFormState = Pick<
  SubscriptionFormStateBase,
  'cycle' | 'cycleMode' | 'customUnit' | 'customValue' | 'startDate' | 'endDate'
>;

export const deriveCycleState = (
  cycle: BillingCycle
): Pick<SubscriptionFormStateBase, 'cycleMode' | 'customUnit' | 'customValue'> => {
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
    customUnit: DEFAULT_CUSTOM_UNIT,
    customValue: '1',
  };
};

export const resolveCycleFromState = (
  cycleMode: CycleMode,
  cycle: BillingCycle,
  customUnit: CycleUnit,
  customValue: string
): BillingCycle => {
  if (cycleMode === 'custom') {
    const amount = Number(customValue);
    const sanitized = Number.isFinite(amount) && amount > 0 ? Math.floor(amount) : 1;
    return buildCustomCycle(customUnit, sanitized);
  }

  return isPresetCycle(cycle) ? cycle : getDefaultCycle();
};

export const sanitizeCustomValue = (value: string): string => {
  const parsed = Number(value);
  const amount = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
  return String(amount);
};

export const createBlankSubscriptionFormState =
  (): SubscriptionFormStateBase => {
    const today = new Date().toISOString().split('T')[0];
    const cycle = getDefaultCycle();
    const cycleState = deriveCycleState(cycle);

    return {
      name: '',
      brand: '',
      price: '',
      currency: 'TWD',
      startDate: today,
      endDate: calculateEndDate(today, cycle),
      cycle,
      ...cycleState,
      iconUrl: '',
      autoRenew: false,
      categoryId: null,
    };
  };

export const createFormStateFromSubscription = (
  subscription: Subscription
): SubscriptionFormStateBase => {
  const cycleState = deriveCycleState(subscription.cycle);

  return {
    name: subscription.name,
    brand: subscription.brand,
    price: subscription.price.toString(),
    currency: subscription.currency,
    startDate: subscription.startDate,
    endDate: subscription.endDate,
    cycle: subscription.cycle,
    ...cycleState,
    iconUrl: subscription.iconUrl ?? '',
    autoRenew: Boolean(subscription.autoRenew),
    categoryId: subscription.categoryId ?? null,
  };
};

export const createCycleAwareUpdater =
  <T extends CycleAwareFormState>(
    setState: Dispatch<SetStateAction<T>>
  ) =>
  (updater: (prev: T) => T) => {
    setState((prev) => {
      const next = updater(prev);
      const autoEndDate = calculateEndDate(next.startDate, next.cycle);
      if (autoEndDate) {
        next.endDate = autoEndDate;
      }
      return next;
    });
  };

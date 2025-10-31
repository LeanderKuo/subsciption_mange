import { addDays, format } from 'date-fns';
import { BillingCycle, SubscriptionInput } from '../types/subscription';

const cycleDurations: Record<BillingCycle, number> = {
  '30days': 30,
  '6months': 180,
  '1year': 360,
};

export const calculateEndDate = (
  startDate: string,
  cycle: BillingCycle
): string => {
  if (!startDate) return '';

  const parsedDate = new Date(startDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  const daysToAdd = cycleDurations[cycle] ?? cycleDurations['30days'];
  return format(addDays(parsedDate, daysToAdd), 'yyyy-MM-dd');
};

export const getDefaultCycle = (): BillingCycle => '30days';

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

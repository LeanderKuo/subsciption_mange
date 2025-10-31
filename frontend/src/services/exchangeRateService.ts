import { supabase } from './supabaseClient';

interface ExchangeRateResponse {
  rate: number;
  cached: boolean;
}

export const getExchangeRate = async (
  targetCurrency: string
): Promise<number> => {
  try {
    const { data, error } = await supabase.functions.invoke('exchange-rate', {
      body: { targetCurrency },
    });

    if (error) {
      console.error('Failed to fetch exchange rate:', error);
      // Fallback to hardcoded rates if API fails
      return getDefaultRate(targetCurrency);
    }

    const result = data as ExchangeRateResponse;
    return result.rate;
  } catch (err) {
    console.error('Exchange rate service error:', err);
    return getDefaultRate(targetCurrency);
  }
};

// Fallback rates if API fails
const getDefaultRate = (currency: string): number => {
  const defaultRates: Record<string, number> = {
    TWD: 1,
    USD: 31.5,
    EUR: 34.5,
    JPY: 0.21,
    GBP: 39.8,
  };

  return defaultRates[currency] || 1;
};

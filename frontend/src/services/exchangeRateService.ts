import { supabase } from './supabaseClient';

interface ExchangeRateResponse {
  rate: number;
  cached: boolean;
}

export const getExchangeRate = async (
  sourceCurrency: string
): Promise<number> => {
  try {
    // If source currency is TWD, rate is 1
    if (sourceCurrency === 'TWD') {
      return 1;
    }

    const { data, error } = await supabase.functions.invoke('exchange-rate', {
      body: { targetCurrency: 'TWD', baseCurrency: sourceCurrency },
    });

    if (error) {
      console.error('Failed to fetch exchange rate:', error);
      console.error('Error details:', error);
      // Fallback to hardcoded rates if API fails
      return getDefaultRate(sourceCurrency);
    }

    const result = data as ExchangeRateResponse;
    console.log(`Exchange rate API response for ${sourceCurrency}:`, result);
    return result.rate;
  } catch (err) {
    console.error('Exchange rate service error:', err);
    return getDefaultRate(sourceCurrency);
  }
};

// Fallback rates if API fails (approximate rates to TWD)
const getDefaultRate = (currency: string): number => {
  const defaultRates: Record<string, number> = {
    TWD: 1,
    USD: 31.5,
    EUR: 34.5,
    JPY: 0.21,
    GBP: 39.8,
    CNY: 4.4,
  };

  return defaultRates[currency] || 1;
};

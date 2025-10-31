import { supabase } from './supabaseClient';

interface ExchangeRateResponse {
  rate: number;
  cached: boolean;
}

export const getExchangeRate = async (
  sourceCurrency: string,
  targetCurrency: string
): Promise<number> => {
  try {
    // If same currency, rate is 1
    if (sourceCurrency === targetCurrency) {
      return 1;
    }

    const { data, error } = await supabase.functions.invoke('exchange-rate', {
      body: { baseCurrency: sourceCurrency, targetCurrency },
    });

    if (error) {
      console.error('Failed to fetch exchange rate:', error);
      console.error('Error details:', error);
      // Fallback to hardcoded rates if API fails
      return getDefaultRate(sourceCurrency, targetCurrency);
    }

    const result = data as ExchangeRateResponse;
    console.log(`Exchange rate API response for ${sourceCurrency} -> ${targetCurrency}:`, result);
    return result.rate;
  } catch (err) {
    console.error('Exchange rate service error:', err);
    return getDefaultRate(sourceCurrency, targetCurrency);
  }
};

// Fallback rates if API fails (approximate rates from USD)
const getDefaultRate = (sourceCurrency: string, targetCurrency: string): number => {
  // Default rates: 1 USD = X units of currency
  const defaultRatesFromUSD: Record<string, number> = {
    TWD: 31.5,
    USD: 1,
    EUR: 0.92,
    JPY: 149.5,
    GBP: 0.79,
    CNY: 7.24,
  };

  const sourceRate = defaultRatesFromUSD[sourceCurrency] || 1;
  const targetRate = defaultRatesFromUSD[targetCurrency] || 1;

  // Cross rate: source -> target = (USD -> target) / (USD -> source)
  // Example: EUR -> GBP = (USD -> GBP) / (USD -> EUR) = 0.79 / 0.92
  return targetRate / sourceRate;
};

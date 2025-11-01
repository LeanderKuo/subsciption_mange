import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BrandfetchSuggestion,
  isBrandfetchConfigured,
  searchBrandfetch,
} from '../services/brandfetchService';
import { useLocale } from '../i18n/LocaleProvider';

export interface BrandAutofillResult extends BrandfetchSuggestion {
  query: string;
}

interface BrandAutofillState {
  enabled: boolean;
  isLoading: boolean;
  error: string | null;
  suggestions: BrandAutofillResult[];
  reset: () => void;
}

const SEARCH_LIMIT = 5;

export const useBrandAutofill = (brandValue: string): BrandAutofillState => {
  const enabled = useMemo(() => isBrandfetchConfigured(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<BrandAutofillResult[]>([]);
  const lastResolvedRef = useRef<string>('');
  const { t } = useLocale();

  const reset = useCallback(() => {
    lastResolvedRef.current = '';
    setError(null);
    setSuggestions([]);
  }, []);

  useEffect(() => {
    if (!enabled) {
      reset();
      return;
    }

    const trimmed = brandValue.trim();
    if (!trimmed) {
      reset();
      return;
    }

    if (trimmed === lastResolvedRef.current) {
      return;
    }

    let isActive = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await searchBrandfetch(
          trimmed,
          SEARCH_LIMIT,
          controller.signal
        );

        if (!isActive) {
          return;
        }

        if (!results || results.length === 0) {
          lastResolvedRef.current = trimmed;
          setSuggestions([]);
          setError(t('brandAutofill.error.noResults'));
          return;
        }

        lastResolvedRef.current = trimmed;
        setSuggestions(
          results.map((result) => ({
            ...result,
            query: trimmed,
          }))
        );
      } catch (err: unknown) {
        if (!isActive) {
          return;
        }

        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            return;
          }

          const errorWithCode = err as Error & { code?: number; detail?: string };
          if (errorWithCode.code === 403) {
            console.warn(
              'Brandfetch clientId rejected the request (403).',
              errorWithCode.detail
            );
            setError(errorWithCode.detail ?? t('brandAutofill.error.invalidClient'));
            lastResolvedRef.current = trimmed;
            setSuggestions([]);
            return;
          }

          if (errorWithCode.code === 401) {
            console.warn(
              'Brandfetch rejected the request (401).',
              errorWithCode.detail
            );
            setError(errorWithCode.detail ?? t('brandAutofill.error.authFailed'));
            lastResolvedRef.current = trimmed;
            setSuggestions([]);
            return;
          }
        }

        console.error('Brand suggestions lookup failed', err);
        setError(t('brandAutofill.error.generic'));
        lastResolvedRef.current = trimmed;
        setSuggestions([]);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }, 500);

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [brandValue, enabled, reset, t]);

  return {
    enabled,
    isLoading,
    error,
    suggestions,
    reset,
  };
};

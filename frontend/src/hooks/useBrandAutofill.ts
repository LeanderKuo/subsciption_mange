import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BrandfetchSuggestion,
  isBrandfetchConfigured,
  searchBrandfetch,
} from '../services/brandfetchService';

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
  const timeoutRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    lastResolvedRef.current = '';
    setError(null);
    setSuggestions([]);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const trimmed = brandValue.trim();
    if (!trimmed) {
      reset();
      abortControllerRef.current?.abort();
      return;
    }

    if (trimmed === lastResolvedRef.current) {
      return;
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const scheduleId = window.setTimeout(() => {
      setIsLoading(true);
      setError(null);

      searchBrandfetch(trimmed, SEARCH_LIMIT, controller.signal)
        .then((results) => {
          if (!results || results.length === 0) {
            lastResolvedRef.current = trimmed;
            setSuggestions([]);
            setError('找不到相關品牌');
            return;
          }

          lastResolvedRef.current = trimmed;
          setSuggestions(
            results.map((result) => ({
              ...result,
              query: trimmed,
            }))
          );
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            if (err.name === 'AbortError') {
              return;
            }
            if ((err as Error & { code?: number }).code === 403) {
              const detail = (err as Error & { detail?: string }).detail;
              console.warn('Brandfetch clientId rejected the request (403).', detail);
              setError(detail ?? 'Brandfetch clientId 無效或權限不足');
              lastResolvedRef.current = trimmed;
              setSuggestions([]);
              return;
            }
            if ((err as Error & { code?: number }).code === 401) {
              const detail = (err as Error & { detail?: string }).detail;
              console.warn('Brandfetch rejected the request (401).', detail);
              setError(detail ?? 'Brandfetch 驗證失敗');
              lastResolvedRef.current = trimmed;
              setSuggestions([]);
              return;
            }
          }
          console.error('Brand suggestions lookup failed', err);
          setError('品牌搜尋發生錯誤');
          lastResolvedRef.current = trimmed;
          setSuggestions([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);

    timeoutRef.current = scheduleId;

    return () => {
      window.clearTimeout(scheduleId);
      if (timeoutRef.current === scheduleId) {
        timeoutRef.current = null;
      }
      controller.abort();
    };
  }, [brandValue, enabled, reset]);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      abortControllerRef.current?.abort();
    },
    []
  );

  return {
    enabled,
    isLoading,
    error,
    suggestions,
    reset,
  };
};

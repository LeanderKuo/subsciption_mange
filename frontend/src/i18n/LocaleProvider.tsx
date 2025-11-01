import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Locale } from './translations';
import { translations } from './translations';

type TranslationParams = Record<string, string | number>;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: TranslationParams) => string;
}

const LOCALE_STORAGE_KEY = 'subscription-manager.locale';

export const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

interface LocaleProviderProps {
  children: ReactNode;
}

const detectInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'en' || stored === 'zh-TW' || stored === 'es') {
    return stored;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith('zh')) {
    return 'zh-TW';
  }
  if (browserLanguage.startsWith('es')) {
    return 'es';
  }

  return 'en';
};

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
  };

  const t = useMemo(() => {
    const dictionary = translations[locale] ?? translations.en;
    const fallbackDictionary = translations.en;

    const format = (key: string, params?: TranslationParams) => {
      const template =
        dictionary[key] ??
        fallbackDictionary[key] ??
        key;

      if (!params) {
        return template;
      }

      return Object.entries(params).reduce((acc, [paramKey, value]) => {
        const pattern = new RegExp(`{${paramKey}}`, 'g');
        return acc.replace(pattern, String(value));
      }, template);
    };

    return format;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, t],
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

import { useEffect } from 'react';

type AlternateLink = {
  href: string;
  hrefLang: string;
};

export type SeoConfig = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  locale?: string;
  siteName?: string;
  twitterHandle?: string;
  alternates?: AlternateLink[];
};

const upsertMetaTag = (
  attribute: 'name' | 'property',
  attributeValue: string,
  content: string | undefined,
) => {
  if (!content) return;
  let element = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${attributeValue}"]`,
  );
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertLinkTag = (rel: string, href: string, hreflang?: string) => {
  if (!href) return;
  let selector = `link[rel="${rel}"]`;
  if (hreflang) {
    selector += `[hreflang="${hreflang}"]`;
  }
  let element = document.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (hreflang) {
      element.setAttribute('hreflang', hreflang);
    }
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export const useSeo = (config: SeoConfig) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.title = config.title;

    upsertMetaTag('name', 'description', config.description);
    upsertMetaTag('name', 'keywords', config.keywords?.join(', '));
    upsertMetaTag('name', 'robots', 'index, follow');
    upsertMetaTag('property', 'og:title', config.title);
    upsertMetaTag('property', 'og:description', config.description);
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:image', config.ogImage);
    upsertMetaTag('property', 'og:locale', config.locale);
    upsertMetaTag('property', 'og:site_name', config.siteName);
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:site', config.twitterHandle);
    upsertMetaTag('name', 'twitter:title', config.title);
    upsertMetaTag('name', 'twitter:description', config.description);
    upsertMetaTag('name', 'twitter:image', config.ogImage);

    if (config.canonical) {
      upsertLinkTag('canonical', config.canonical);
    }

    config.alternates?.forEach((alternate) =>
      upsertLinkTag('alternate', alternate.href, alternate.hrefLang),
    );
  }, [config]);
};

type StructuredDataEntry = {
  id: string;
  data: unknown;
};

export const useStructuredData = (entries: StructuredDataEntry[]) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const serialized = entries.map(({ id, data }) => ({
      id,
      json: JSON.stringify(data),
    }));

    const scripts = serialized.map(({ id, json }) => {
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = json;
      document.head.appendChild(script);
      return script;
    });

    return () => {
      scripts.forEach((script) => {
        if (script.parentElement) {
          script.parentElement.removeChild(script);
        }
      });
    };
  }, [entries]);
};

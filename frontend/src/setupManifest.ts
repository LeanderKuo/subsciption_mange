import { appManifest } from './config/appManifest';

declare global {
  interface Window {
    __appManifestUrl?: string;
  }
}

const createManifestJson = () => {
  if (typeof window === 'undefined') {
    return JSON.stringify(appManifest);
  }

  const origin = window.location.origin;
  const startUrl = new URL(appManifest.start_url || '/', origin).toString();
  const icons = (appManifest.icons || []).map((icon) => ({
    ...icon,
    src: new URL(icon.src, origin).toString(),
  }));

  return JSON.stringify({
    ...appManifest,
    start_url: startUrl,
    icons,
  });
};

export const attachAppManifest = () => {
  if (typeof document === 'undefined') {
    return;
  }

  const existing = document.head.querySelector<HTMLLinkElement>(
    'link[rel="manifest"][data-generated-manifest="true"]'
  );
  if (existing) {
    return;
  }

  if (window.__appManifestUrl) {
    URL.revokeObjectURL(window.__appManifestUrl);
  }

  const manifestBlob = new Blob([createManifestJson()], {
    type: 'application/manifest+json',
  });
  const manifestUrl = URL.createObjectURL(manifestBlob);

  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = manifestUrl;
  link.setAttribute('data-generated-manifest', 'true');
  document.head.appendChild(link);

  window.__appManifestUrl = manifestUrl;

  window.addEventListener(
    'beforeunload',
    () => {
      if (window.__appManifestUrl) {
        URL.revokeObjectURL(window.__appManifestUrl);
        delete window.__appManifestUrl;
      }
    },
    { once: true }
  );
};

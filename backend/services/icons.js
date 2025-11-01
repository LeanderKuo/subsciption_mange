const ICON_OVERRIDES = {
  netflix: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg",
  spotify: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg",
  "youtube-premium":
    "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg",
  "hbo-max": "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/hbo.svg",
  disney: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/disney.svg",
  duolingo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/duolingo.svg",
  chatgpt: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg",
  claude: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/anthropic.svg",
  gemini: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg",
  discord: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg",
  plurk: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/plurk.svg",
  notion: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notion.svg",
  github: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg",
  figma: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg",
  "tunnel-bear":
    "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tunnelbear.svg",
};

const ICON_CDN_BASE =
  "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/";

const normalizeBrand = (brand = "") => brand.trim().toLowerCase();

const resolveIconUrl = (brand, iconUrl) => {
  if (iconUrl) {
    return iconUrl;
  }

  const normalized = normalizeBrand(brand);
  if (!normalized) {
    return null;
  }

  return ICON_OVERRIDES[normalized] ?? `${ICON_CDN_BASE}${normalized}.svg`;
};

const findIconUrl = (brand) => {
  const normalized = normalizeBrand(brand);
  if (!normalized) {
    return null;
  }

  return ICON_OVERRIDES[normalized] ?? null;
};

module.exports = {
  resolveIconUrl,
  findIconUrl,
};

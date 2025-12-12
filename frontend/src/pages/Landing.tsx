import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  AttachMoney,
  Category,
  ExpandMore,
  Loop,
  Security,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { keyframes } from "@mui/system";
import { AuthDialog } from "../components/AuthDialog";
import { useLocale } from "../i18n/LocaleProvider";
import type { Locale } from "../i18n/translations";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useSeo, useStructuredData } from "../hooks/useSeo";

const marqueeAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const BASE_URL = "https://www.submange.com";
const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  "zh-TW": "zh_TW",
  es: "es_ES",
};
const HREF_LANG_MAP: Record<Locale, string> = {
  en: "en",
  "zh-TW": "zh-Hant-TW",
  es: "es",
};

const Landing = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { t, locale, setLocale } = useLocale();

  const marqueeItems = useMemo(
    () => [
      { name: "Netflix", bg: "#000000", text: "#E50914" },
      { name: "Spotify", bg: "#000000", text: "#1DB954" },
      { name: "YouTube Premium", bg: "#FF0000", text: "#FFFFFF" },
      { name: "Claude", bg: "#FFFFFF", text: "#D97757", border: "#D97757" },
      { name: "ChatGPT", bg: "#FFFFFF", text: "#10A37F", border: "#10A37F" },
      { name: "Gemini", bg: "#FFFFFF", text: "#4285F4", border: "#4285F4" },
      { name: "GitHub", bg: "#181717", text: "#FFFFFF" },
      { name: "Adobe Creative Cloud", bg: "#FF0000", text: "#FFFFFF" },
      { name: "Notion", bg: "#FFFFFF", text: "#000000", border: "#000000" },
      {
        name: "Canva",
        bg: "linear-gradient(135deg, #00C4CC 0%, #7D2AE8 100%)",
        text: "#FFFFFF",
      },
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        icon: <AttachMoney sx={{ fontSize: 48, color: "#34b27b" }} />,
        title: t("landing.features.track.title"),
        description: t("landing.features.track.description"),
      },
      {
        icon: <Category sx={{ fontSize: 48, color: "#34b27b" }} />,
        title: t("landing.features.category.title"),
        description: t("landing.features.category.description"),
      },
      {
        icon: <Loop sx={{ fontSize: 48, color: "#34b27b" }} />,
        title: t("landing.features.cycle.title"),
        description: t("landing.features.cycle.description"),
      },
      {
        icon: <Security sx={{ fontSize: 48, color: "#34b27b" }} />,
        title: t("landing.features.security.title"),
        description: t("landing.features.security.description"),
      },
    ],
    [t]
  );

  const faqs = useMemo(
    () => [
      {
        question: t("landing.faq.free.question"),
        answer: t("landing.faq.free.answer"),
      },
      {
        question: t("landing.faq.security.question"),
        answer: t("landing.faq.security.answer"),
      },
      {
        question: t("landing.faq.supported.question"),
        answer: t("landing.faq.supported.answer"),
      },
      {
        question: t("landing.faq.price.question"),
        answer: t("landing.faq.price.answer"),
      },
      {
        question: t("landing.faq.devices.question"),
        answer: t("landing.faq.devices.answer"),
      },
    ],
    [t]
  );

  const navLinks = useMemo(
    () => [
      { label: t("landing.nav.features"), href: "#features" },
      { label: t("landing.nav.faq"), href: "#faq" },
    ],
    [t]
  );

  const handleAuthSuccess = () => {
    setAuthDialogOpen(false);
    window.location.reload();
  };

  const canonicalUrl = useMemo(() => {
    const url = new URL("/", BASE_URL);
    if (locale !== "en") {
      url.searchParams.set("lang", locale);
    }
    return url.toString();
  }, [locale]);

  const keywords = useMemo(() => {
    const value = t("landing.meta.keywords");
    return value
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
  }, [t]);

  const seoTitle = t("landing.meta.title");
  const seoDescription = t("landing.meta.description");

  useSeo({
    title: seoTitle,
    description: seoDescription,
    keywords,
    canonical: canonicalUrl,
    ogImage: `${BASE_URL}/og-image.png`,
    locale: OG_LOCALE_MAP[locale],
    siteName: "SubMange",
    twitterHandle: "@SubMange",
    alternates: [
      { href: `${BASE_URL}/`, hrefLang: "en" },
      { href: `${BASE_URL}/?lang=zh-TW`, hrefLang: "zh-Hant-TW" },
      { href: `${BASE_URL}/?lang=es`, hrefLang: "es" },
      { href: `${BASE_URL}/`, hrefLang: "x-default" },
    ],
  });

  const structuredDataEntries = useMemo(() => {
    const softwareApplication = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "SubMange",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: canonicalUrl,
      description: seoDescription,
      inLanguage: HREF_LANG_MAP[locale],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      publisher: {
        "@type": "Organization",
        name: "SubMange",
        url: BASE_URL,
      },
    };

    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    return [
      { id: "ld-software-application", data: softwareApplication },
      { id: `ld-faq-${locale}`, data: faqStructuredData },
    ];
  }, [canonicalUrl, faqs, locale, seoDescription]);

  useStructuredData(structuredDataEntries);

  const headerRight = (
    <Stack direction="row" spacing={2} alignItems="center">
      <LanguageSwitcher value={locale} onChange={setLocale} variant="dark" />
      <Button variant="text" onClick={() => setAuthDialogOpen(true)}>
        {t("landing.nav.signIn")}
      </Button>
      <Button variant="contained" onClick={() => setAuthDialogOpen(true)}>
        {t("landing.nav.join")}
      </Button>
    </Stack>
  );

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SiteHeader navLinks={navLinks} rightSlot={headerRight} variant="dark" />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(52, 178, 123, 0.15), transparent 70%)",
            pt: { xs: 15, md: 20 },
            pb: { xs: 10, md: 14 },
            overflow: "hidden",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.75rem", md: "4.5rem" },
                    fontWeight: 800,
                    mb: 3,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    background:
                      "linear-gradient(to right, #fff 30%, rgba(255, 255, 255, 0.5))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("landing.hero.title.line1")}
                  <br />
                  {t("landing.hero.title.line2")}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.4rem" },
                    mb: 4,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: "text.secondary",
                  }}
                >
                  {t("landing.hero.subtitle")}
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setAuthDialogOpen(true)}
                    sx={{ px: 5, py: 1.5, fontSize: "1.1rem" }}
                  >
                    {t("landing.hero.cta")}
                  </Button>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {t("landing.hero.helper")}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 4, md: 5 },
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <Stack spacing={3}>
                    <Stack spacing={1}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#34b27b",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t("landing.hero.card.session")}
                      </Typography>
                      <Typography variant="h5" fontWeight={700}>
                        {t("landing.hero.card.title")}
                      </Typography>
                    </Stack>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        backgroundColor: "rgba(52, 178, 123, 0.1)",
                        border: "1px solid rgba(52, 178, 123, 0.2)",
                      }}
                    >
                      <Typography fontWeight={600} sx={{ color: "#34b27b" }}>
                        {t("landing.hero.card.focus")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mt: 1.5 }}
                      >
                        {t("landing.hero.card.description")}
                      </Typography>
                    </Paper>
                    <Stack spacing={1.5}>
                      <Typography fontWeight={600}>
                        {t("landing.hero.card.upNext")}
                      </Typography>
                      <Stack spacing={0.5} sx={{ color: "text.secondary" }}>
                        <Typography variant="body2">
                          • {t("landing.hero.card.taskOne")}
                        </Typography>
                        <Typography variant="body2">
                          • {t("landing.hero.card.taskTwo")}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          <Box sx={{ mt: { xs: 8, md: 10 }, overflow: "hidden" }}>
            <Container maxWidth="lg">
              <Box
                sx={{
                  borderRadius: 999,
                  background: "#ffffff",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    py: 1.5,
                    px: 2,
                    animation: `${marqueeAnimation} 30s linear infinite`,
                    width: "max-content",
                  }}
                >
                  {marqueeItems.concat(marqueeItems).map((item, index) => (
                    <Chip
                      key={`${item.name}-${index}`}
                      label={item.name}
                      sx={{
                        backgroundColor: item.bg,
                        color: item.text,
                        border: item.border
                          ? `1px solid ${item.border}`
                          : "none",
                        fontWeight: 600,
                        borderRadius: 999,
                        px: 1.5,
                        "& .MuiChip-label": {
                          color: "inherit",
                          px: 1,
                        },
                        "&:hover": {
                          backgroundColor: item.bg,
                          opacity: 0.9,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>

        <Box
          id="features"
          sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#000" }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 700,
                mb: 6,
                textAlign: "center",
              }}
            >
              {t("landing.features.title")}
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box
          id="faq"
          sx={{ py: { xs: 8, md: 12 }, backgroundColor: "background.default" }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 700,
                mb: 6,
                textAlign: "center",
              }}
            >
              {t("landing.faq.title")}
            </Typography>
            <Stack spacing={2}>
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{
                    boxShadow: "none",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px !important",
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(10px)",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: "text.secondary" }} />}
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        my: 2,
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: "text.secondary" }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Container>
        </Box>

        <Box
          sx={{
            py: { xs: 8, md: 12 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Gradient Orb */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle, rgba(52, 178, 123, 0.2) 0%, transparent 70%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
            <Stack spacing={4} alignItems="center" textAlign="center">
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 700,
                }}
              >
                {t("landing.cta.title")}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  color: "text.secondary",
                  maxWidth: "600px",
                }}
              >
                {t("landing.cta.description")}
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => setAuthDialogOpen(true)}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: "1.05rem",
                }}
              >
                {t("landing.cta.button")}
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>

      <SiteFooter />

      <AuthDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </Box>
  );
};

export default Landing;

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  AttachMoney,
  TrendingUp,
  Notifications,
  Security,
  ExpandMore,
} from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { AuthDialog } from "../components/AuthDialog";
import { useLocale } from "../i18n/LocaleProvider";
import type { Locale } from "../i18n/translations";

const Landing = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { t, locale, setLocale } = useLocale();

  const features = useMemo(
    () => [
      {
        icon: <AttachMoney sx={{ fontSize: 48, color: "#000" }} />,
        title: t("landing.features.track.title"),
        description: t("landing.features.track.description"),
      },
      {
        icon: <TrendingUp sx={{ fontSize: 48, color: "#000" }} />,
        title: t("landing.features.price.title"),
        description: t("landing.features.price.description"),
      },
      {
        icon: <Notifications sx={{ fontSize: 48, color: "#000" }} />,
        title: t("landing.features.renew.title"),
        description: t("landing.features.renew.description"),
      },
      {
        icon: <Security sx={{ fontSize: 48, color: "#000" }} />,
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

  const handleAuthSuccess = () => {
    setAuthDialogOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    document.title = 'submange - Manage every subscription with clarity';
  }, []);

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Hero Section - Uber Style */}
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          pt: { xs: 8, md: 16 },
          pb: { xs: 8, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end" mb={3}>
            <FormControl
              size="small"
              sx={{
                minWidth: 160,
                '& .MuiInputBase-root': {
                  color: '#fff',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff',
                },
                '& .MuiSvgIcon-root': {
                  color: '#fff',
                },
                '& .MuiInputLabel-root': {
                  color: '#fff',
                },
              }}
            >
              <InputLabel>{t("header.language.label")}</InputLabel>
              <Select
                value={locale}
                label={t("header.language.label")}
                onChange={(event) => setLocale(event.target.value as Locale)}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <MenuItem value="en">{t("header.language.en")}</MenuItem>
                <MenuItem value="zh-TW">{t("header.language.zh-TW")}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
                  fontWeight: 700,
                  mb: 3,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {t("landing.hero.title.line1")}
                <br />
                {t("landing.hero.title.line2")}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.5rem" },
                  mb: 4,
                  color: "#fff",
                  opacity: 0.9,
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                {t("landing.hero.subtitle")}
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => setAuthDialogOpen(true)}
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  px: 5,
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                  boxShadow: "none",
                }}
              >
                {t("landing.hero.cta")}
              </Button>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  backgroundColor: "#1a1a1a",
                  borderRadius: "16px",
                  p: 4,
                  border: "1px solid #333",
                }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="h2"
                      sx={{ fontSize: "3rem", fontWeight: 700, color: "#fff" }}
                    >
                      {t("landing.pricing.free")}
                    </Typography>
                    <Typography sx={{ color: "#999", mt: 1 }}>
                      {t("landing.pricing.freeDescription")}
                    </Typography>
                  </Box>
                  <Box sx={{ borderTop: "1px solid #333", pt: 3 }}>
                    <Stack spacing={2}>
                      <Typography sx={{ color: "#fff" }}>
                        ✓ {t("landing.pricing.features.unlimited")}
                      </Typography>
                      <Typography sx={{ color: "#fff" }}>
                        ✓ {t("landing.pricing.features.priceChange")}
                      </Typography>
                      <Typography sx={{ color: "#fff" }}>
                        ✓ {t("landing.pricing.features.autoRenew")}
                      </Typography>
                      <Typography sx={{ color: "#fff" }}>
                        ✓ {t("landing.pricing.features.multiCurrency")}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#fff" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 6,
              textAlign: "center",
              color: "#000",
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
                    boxShadow: "none",
                    border: "2px solid #000",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 2, color: "#000" }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 6,
              textAlign: "center",
              color: "#000",
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
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px !important",
                  "&:before": { display: "none" },
                  mb: 2,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      my: 2,
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: "#000" }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "#666" }}>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {t("landing.cta.title")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
                color: "#ccc",
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
                backgroundColor: "#fff",
                color: "#000",
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                boxShadow: "none",
              }}
            >
              {t("landing.cta.button")}
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#999",
          py: 4,
          borderTop: "1px solid #333",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" textAlign="center">
            {t("landing.footer")}
          </Typography>
        </Container>
      </Box>

      {/* Auth Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </Box>
  );
};

export default Landing;

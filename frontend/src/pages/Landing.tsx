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
  Link,
  Chip,
  Paper,
} from "@mui/material";
import {
  AttachMoney,
  TrendingUp,
  Notifications,
  Security,
  ExpandMore,
} from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { keyframes } from "@mui/system";
import { AuthDialog } from "../components/AuthDialog";
import { useLocale } from "../i18n/LocaleProvider";
import type { Locale } from "../i18n/translations";

const Landing = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { t, locale, setLocale } = useLocale();

  const marqueeItems = useMemo(
    () => [
      "Netflix",
      "Spotify",
      "YouTube Premium",
      "ChatGPT",
      "Gemini",
      "Adobe Creative Cloud",
      "Notion",
      "Canva",
    ],
    []
  );

  const marqueeAnimation = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  `;

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
    <Box sx={{ backgroundColor: "#f6f5ff", minHeight: "100vh" }}>
      {/* Top Navigation */}
      <Box
        component="header"
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #ece8ff",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              py: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: "0.08em", color: "#4b3cf6" }}
            >
              {t("landing.nav.brand")}
            </Typography>

            <Box
              component="nav"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexGrow: 1,
                justifyContent: { xs: "flex-start", md: "center" },
              }}
            >
              <Button
                component="a"
                href="#features"
                color="inherit"
                sx={{
                  fontWeight: 600,
                  textTransform: "none",
                  color: "#4b3cf6",
                }}
              >
                {t("landing.nav.features")}
              </Button>
              <Button
                component="a"
                href="#faq"
                color="inherit"
                sx={{
                  fontWeight: 600,
                  textTransform: "none",
                  color: "#4b3cf6",
                }}
              >
                {t("landing.nav.faq")}
              </Button>
            </Box>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ flexShrink: 0 }}
            >
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>{t("header.language.label")}</InputLabel>
                <Select
                  value={locale}
                  label={t("header.language.label")}
                  onChange={(event) => setLocale(event.target.value as Locale)}
                >
                  <MenuItem value="en">{t("header.language.en")}</MenuItem>
                  <MenuItem value="zh-TW">{t("header.language.zh-TW")}</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="text"
                sx={{ textTransform: "none", fontWeight: 600, color: "#4b3cf6" }}
                onClick={() => setAuthDialogOpen(true)}
              >
                {t("landing.nav.signIn")}
              </Button>
              <Button
                variant="contained"
                onClick={() => setAuthDialogOpen(true)}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#4b3cf6",
                  "&:hover": { backgroundColor: "#3b2fd1" },
                  fontWeight: 600,
                }}
              >
                {t("landing.nav.join")}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f9f8ff 0%, #f3efff 100%)",
          pt: { xs: 10, md: 12 },
          pb: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  fontWeight: 700,
                  mb: 3,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#1c1830",
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
                  lineHeight: 1.5,
                  color: "#453a84",
                }}
              >
                {t("landing.hero.subtitle")}
              </Typography>
              <Button
                variant="contained"
                onClick={() => setAuthDialogOpen(true)}
                sx={{
                  backgroundColor: "#4b3cf6",
                  color: "#fff",
                  px: 5,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: "999px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#3b2fd1",
                  },
                  boxShadow: "0 12px 24px rgba(75, 60, 246, 0.2)",
                }}
              >
                {t("landing.hero.cta")}
              </Button>
              <Typography
                variant="body2"
                sx={{ color: "#6f6c8f", mt: 2 }}
              >
                {t("landing.hero.helper")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: 4,
                  background: "#fff",
                  boxShadow: "0 30px 80px rgba(76, 62, 245, 0.15)",
                }}
              >
                <Stack spacing={3}>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: "#1c1830" }}>
                    {t("landing.hero.card.title")}
                  </Typography>
                  <Stack spacing={2}>
                    <Typography sx={{ fontWeight: 600, color: "#4b3cf6" }}>
                      {t("landing.hero.card.session")}
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        border: "1px solid #ece8ff",
                        background: "#f8f6ff",
                      }}
                    >
                      <Typography sx={{ color: "#1c1830", fontWeight: 600 }}>
                        {t("landing.hero.card.focus")}
                      </Typography>
                      <Typography sx={{ color: "#6f6c8f", mt: 1 }}>
                        {t("landing.hero.card.description")}
                      </Typography>
                    </Paper>
                    <Stack spacing={1}>
                      <Typography sx={{ fontWeight: 600, color: "#1c1830" }}>
                        {t("landing.hero.card.upNext")}
                      </Typography>
                      <Stack spacing={1}>
                        <Typography sx={{ color: "#6f6c8f" }}>
                          • {t("landing.hero.card.taskOne")}
                        </Typography>
                        <Typography sx={{ color: "#6f6c8f" }}>
                          • {t("landing.hero.card.taskTwo")}
                        </Typography>
                      </Stack>
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
                background: "#f1efff",
                overflow: "hidden",
                border: "1px solid #e2dcff",
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
                    key={`${item}-${index}`}
                    label={item}
                    sx={{
                      backgroundColor: "#fff",
                      color: "#4b3cf6",
                      fontWeight: 600,
                      borderRadius: 999,
                      px: 1.5,
                      boxShadow: "0 4px 16px rgba(75, 60, 246, 0.12)",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        id="features"
        sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#fff" }}
      >
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
      <Box
        id="faq"
        sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#f9f9f9" }}
      >
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
          backgroundColor: "#3830c2",
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
          <Stack spacing={1} alignItems="center">
            <Typography variant="body2" textAlign="center">
              {t("landing.footer")}
            </Typography>
            <Typography variant="body2" textAlign="center">
              {t("landing.footer.developer")}
            </Typography>
            <Typography variant="body2" textAlign="center">
              <Link
                href="https://github.com/LeanderKuo"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="hover"
              >
                {t("landing.footer.githubLabel")}
              </Link>
            </Typography>
          </Stack>
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

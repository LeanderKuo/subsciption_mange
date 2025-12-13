import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../i18n/LocaleProvider";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useTheme } from "../theme/ThemeProvider";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t, locale, setLocale } = useLocale();
  const { theme, colors } = useTheme();

  const headerRight = (
    <>
      <ThemeSwitcher />
      <LanguageSwitcher value={locale} onChange={setLocale} variant={theme} />
    </>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.background,
        transition: "background-color 0.3s ease",
      }}
    >
      <SiteHeader navLinks={[]} rightSlot={headerRight} variant={theme} />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="sm" sx={{ py: 12 }}>
          <Box textAlign="center">
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{ color: colors.text }}
            >
              404
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, color: colors.text }}>
              {t("notFound.title")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, mb: 4, color: colors.textSecondary }}
            >
              {t("notFound.description")}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ borderRadius: "999px", px: 4 }}
            >
              {t("notFound.back")}
            </Button>
          </Box>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
};

export default NotFoundPage;

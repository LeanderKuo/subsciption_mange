import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { useLocale } from "../i18n/LocaleProvider";
import { useTheme } from "../theme/ThemeProvider";

export const SiteFooter = () => {
  const { t } = useLocale();
  const { colors } = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.footerBackground,
        color: colors.text,
        py: 4,
        borderTop: `1px solid ${colors.border}`,
        mt: 6,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1} alignItems="center" textAlign="center">
          <Typography variant="body2">{t("footer.copyright")}</Typography>
          <Typography variant="body2">{t("footer.developer")}</Typography>
          <Typography variant="body2">
            <Link
              href="https://github.com/LeanderKuo"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: colors.primary }}
              underline="hover"
            >
              {t("footer.github")}
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default SiteFooter;

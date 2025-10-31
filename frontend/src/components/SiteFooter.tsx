import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { useLocale } from '../i18n/LocaleProvider';

export const SiteFooter = () => {
  const { t } = useLocale();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000',
        color: '#9ca3af',
        py: 4,
        borderTop: '1px solid #1f1f1f',
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1} alignItems="center" textAlign="center">
          <Typography variant="body2">{t('footer.copyright')}</Typography>
          <Typography variant="body2">{t('footer.developer')}</Typography>
          <Typography variant="body2">
            <Link
              href="https://github.com/LeanderKuo"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="hover"
            >
              {t('footer.github')}
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default SiteFooter;

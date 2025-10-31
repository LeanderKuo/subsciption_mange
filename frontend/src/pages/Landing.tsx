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
} from '@mui/material';
import {
  AttachMoney,
  ExpandMore,
  Notifications,
  Security,
  TrendingUp,
} from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import { keyframes } from '@mui/system';
import { AuthDialog } from '../components/AuthDialog';
import { useLocale } from '../i18n/LocaleProvider';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import LanguageSwitcher from '../components/LanguageSwitcher';

const marqueeAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Landing = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { t, locale, setLocale } = useLocale();

  const marqueeItems = useMemo(
    () => [
      'Netflix',
      'Spotify',
      'YouTube Premium',
      'ChatGPT',
      'Gemini',
      'Adobe Creative Cloud',
      'Notion',
      'Canva',
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        icon: <AttachMoney sx={{ fontSize: 48, color: '#000' }} />,
        title: t('landing.features.track.title'),
        description: t('landing.features.track.description'),
      },
      {
        icon: <TrendingUp sx={{ fontSize: 48, color: '#000' }} />,
        title: t('landing.features.price.title'),
        description: t('landing.features.price.description'),
      },
      {
        icon: <Notifications sx={{ fontSize: 48, color: '#000' }} />,
        title: t('landing.features.renew.title'),
        description: t('landing.features.renew.description'),
      },
      {
        icon: <Security sx={{ fontSize: 48, color: '#000' }} />,
        title: t('landing.features.security.title'),
        description: t('landing.features.security.description'),
      },
    ],
    [t]
  );

  const faqs = useMemo(
    () => [
      {
        question: t('landing.faq.free.question'),
        answer: t('landing.faq.free.answer'),
      },
      {
        question: t('landing.faq.security.question'),
        answer: t('landing.faq.security.answer'),
      },
      {
        question: t('landing.faq.supported.question'),
        answer: t('landing.faq.supported.answer'),
      },
      {
        question: t('landing.faq.price.question'),
        answer: t('landing.faq.price.answer'),
      },
      {
        question: t('landing.faq.devices.question'),
        answer: t('landing.faq.devices.answer'),
      },
    ],
    [t]
  );

  const navLinks = useMemo(
    () => [
      { label: t('landing.nav.features'), href: '#features' },
      { label: t('landing.nav.faq'), href: '#faq' },
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

  const headerRight = (
    <Stack direction="row" spacing={2} alignItems="center">
      <LanguageSwitcher value={locale} onChange={setLocale} variant="dark" />
      <Button
        variant="text"
        onClick={() => setAuthDialogOpen(true)}
        sx={{ color: '#fff', fontWeight: 600 }}
      >
        {t('landing.nav.signIn')}
      </Button>
      <Button
        variant="contained"
        onClick={() => setAuthDialogOpen(true)}
        sx={{
          backgroundColor: '#fff',
          color: '#000',
          borderRadius: '999px',
          fontWeight: 700,
          px: 4,
          '&:hover': { backgroundColor: '#e5e5e5' },
        }}
      >
        {t('landing.nav.join')}
      </Button>
    </Stack>
  );

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SiteHeader navLinks={navLinks} rightSlot={headerRight} variant="dark" />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            pt: { xs: 10, md: 14 },
            pb: { xs: 10, md: 14 },
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.75rem', md: '4rem' },
                    fontWeight: 700,
                    mb: 3,
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {t('landing.hero.title.line1')}
                  <br />
                  {t('landing.hero.title.line2')}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.4rem' },
                    mb: 4,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: '#d1d5db',
                  }}
                >
                  {t('landing.hero.subtitle')}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                  <Button
                    variant="contained"
                    onClick={() => setAuthDialogOpen(true)}
                    sx={{
                      backgroundColor: '#fff',
                      color: '#000',
                      borderRadius: '999px',
                      fontWeight: 700,
                      px: 5,
                      py: 1.5,
                      '&:hover': { backgroundColor: '#e5e5e5' },
                    }}
                  >
                    {t('landing.hero.cta')}
                  </Button>
                  <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                    {t('landing.hero.helper')}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 4, md: 5 },
                    borderRadius: 4,
                    backgroundColor: '#111',
                    border: '1px solid #2c2c2c',
                    color: '#f5f5f5',
                  }}
                >
                  <Stack spacing={3}>
                    <Stack spacing={1}>
                      <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                        {t('landing.hero.card.session')}
                      </Typography>
                      <Typography variant="h5" fontWeight={700}>
                        {t('landing.hero.card.title')}
                      </Typography>
                    </Stack>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        backgroundColor: '#1f1f1f',
                        border: '1px solid #2f2f2f',
                      }}
                    >
                      <Typography fontWeight={600}>
                        {t('landing.hero.card.focus')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#9ca3af', mt: 1.5 }}>
                        {t('landing.hero.card.description')}
                      </Typography>
                    </Paper>
                    <Stack spacing={1.5}>
                      <Typography fontWeight={600}>
                        {t('landing.hero.card.upNext')}
                      </Typography>
                      <Stack spacing={0.5} sx={{ color: '#cbd5f5' }}>
                        <Typography variant="body2">
                          • {t('landing.hero.card.taskOne')}
                        </Typography>
                        <Typography variant="body2">
                          • {t('landing.hero.card.taskTwo')}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          <Box sx={{ mt: { xs: 8, md: 10 }, overflow: 'hidden' }}>
            <Container maxWidth="lg">
              <Box
                sx={{
                  borderRadius: 999,
                  backgroundColor: '#1a1a1a',
                  overflow: 'hidden',
                  border: '1px solid #2a2a2a',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    py: 1.5,
                    px: 2,
                    animation: `${marqueeAnimation} 30s linear infinite`,
                    width: 'max-content',
                  }}
                >
                  {marqueeItems.concat(marqueeItems).map((item, index) => (
                    <Chip
                      key={`${item}-${index}`}
                      label={item}
                      sx={{
                        backgroundColor: '#2d2d2d',
                        color: '#f5f5f5',
                        fontWeight: 600,
                        borderRadius: 999,
                        px: 1.5,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>

        <Box id="features" sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fff' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 6,
                textAlign: 'center',
                color: '#000',
              }}
            >
              {t('landing.features.title')}
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      boxShadow: 'none',
                      border: '2px solid #000',
                      borderRadius: '12px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 2, color: '#000' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#4b5563' }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box id="faq" sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#f4f4f5' }}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 6,
                textAlign: 'center',
                color: '#000',
              }}
            >
              {t('landing.faq.title')}
            </Typography>
            <Stack spacing={2}>
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{
                    boxShadow: 'none',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px !important',
                    backgroundColor: '#fff',
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: '#000' }} />}
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        my: 2,
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, color: '#000' }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: '#4b5563' }}>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Container>
        </Box>

        <Box
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            py: { xs: 8, md: 12 },
          }}
        >
          <Container maxWidth="md">
            <Stack spacing={4} alignItems="center" textAlign="center">
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {t('landing.cta.title')}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: '#d1d5db',
                  maxWidth: '600px',
                }}
              >
                {t('landing.cta.description')}
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => setAuthDialogOpen(true)}
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  px: 6,
                  py: 2,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: '999px',
                  '&:hover': {
                    backgroundColor: '#e5e5e5',
                  },
                }}
              >
                {t('landing.cta.button')}
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

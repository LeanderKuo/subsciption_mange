import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleProvider';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <Container maxWidth="sm" sx={{ py: 12 }}>
      <Box textAlign="center">
        <Typography variant="h2" fontWeight={700}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {t('notFound.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          {t('notFound.description')}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          {t('notFound.back')}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;

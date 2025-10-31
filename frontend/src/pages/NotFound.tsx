import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 12 }}>
      <Box textAlign="center">
        <Typography variant="h2" fontWeight={700}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          找不到頁面
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          抱歉，您通往的頁面不存在或已被移除。
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          回到首頁
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;

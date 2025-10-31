import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { UserProfile, UserProfileInput } from '../types/subscription';
import { ArrowBack, Person } from '@mui/icons-material';
import { useLocale } from '../i18n/LocaleProvider';
import { useToast } from '../hooks/use-toast';

export const UserSettings = () => {
  const navigate = useNavigate();
  const { t } = useLocale();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    defaultCurrency: 'TWD',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/');
          return;
        }

        // Fetch user profile
        const { data, error: fetchError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (fetchError) {
          // Profile doesn't exist, create one
          const { data: newProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert({
              id: user.id,
              email: user.email,
              default_currency: 'TWD',
            })
            .select()
            .single();

          if (createError) {
            throw createError;
          }

          const profileData: UserProfile = {
            id: newProfile.id,
            email: newProfile.email,
            nickname: newProfile.nickname,
            defaultCurrency: newProfile.default_currency,
            createdAt: newProfile.created_at,
            updatedAt: newProfile.updated_at,
          };

          setForm({
            email: profileData.email || '',
            nickname: profileData.nickname || '',
            defaultCurrency: profileData.defaultCurrency,
          });
        } else {
          const profileData: UserProfile = {
            id: data.id,
            email: data.email,
            nickname: data.nickname,
            defaultCurrency: data.default_currency,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };

          setForm({
            email: profileData.email || '',
            nickname: profileData.nickname || '',
            defaultCurrency: profileData.defaultCurrency,
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError(err instanceof Error ? err.message : t('settings.loadingError'));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, t]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error(t('auth.error.notAuthenticated'));
      }

      const updateData: UserProfileInput = {
        email: form.email.trim() || null,
        nickname: form.nickname.trim() || null,
        defaultCurrency: form.defaultCurrency,
      };

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          email: updateData.email,
          nickname: updateData.nickname,
          default_currency: updateData.defaultCurrency,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      setSuccess(t('settings.updateSuccess'));
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err instanceof Error ? err.message : t('settings.updateError'));
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: t('header.logoutSuccess'),
        description: t('header.logoutSuccessDescription'),
      });
      navigate('/');
    } catch (err) {
      console.error('Failed to sign out:', err);
      toast({
        title: t('header.logoutFailure'),
        description: t('header.logoutFailureDescription'),
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#fff',
        }}
      >
        <CircularProgress size={60} sx={{ color: '#000' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          borderBottom: '2px solid #000',
          backgroundColor: '#000',
          py: 2,
          px: 3,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/dashboard')}
              sx={{ color: '#fff' }}
            >
              {t('settings.back')}
            </Button>
            <Person sx={{ color: '#fff' }} />
            <Typography variant="h5" fontWeight={700} sx={{ color: '#fff' }}>
              {t('settings.title')}
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card
          elevation={0}
          sx={{ borderRadius: 2, border: '2px solid #000', backgroundColor: '#fff' }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#000' }}>
                {t('settings.section.basic')}
              </Typography>

              {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" onClose={() => setSuccess(null)}>
                  {success}
                </Alert>
              )}

              <TextField
                label={t('settings.email')}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                fullWidth
                helperText={t('settings.email.helper')}
              />

              <TextField
                label={t('settings.nickname')}
                value={form.nickname}
                onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                fullWidth
                helperText={t('settings.nickname.helper')}
              />

              <TextField
                label={t('settings.defaultCurrency')}
                select
                value={form.defaultCurrency}
                onChange={(e) => setForm({ ...form, defaultCurrency: e.target.value })}
                fullWidth
                required
                helperText={t('settings.defaultCurrency.helper')}
              >
                <MenuItem value="TWD">{t('currency.TWD')}</MenuItem>
                <MenuItem value="USD">{t('currency.USD')}</MenuItem>
                <MenuItem value="EUR">{t('currency.EUR')}</MenuItem>
                <MenuItem value="JPY">{t('currency.JPY')}</MenuItem>
                <MenuItem value="GBP">{t('currency.GBP')}</MenuItem>
              </TextField>

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    color: '#000',
                    borderColor: '#000',
                    '&:hover': {
                      borderColor: '#333',
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  {t('settings.cancel')}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={saving}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  {saving ? t('settings.saving') : t('settings.save')}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card
          elevation={0}
          sx={{ borderRadius: 2, border: '2px solid #000', backgroundColor: '#fff', mt: 3 }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#000' }}>
                {t('settings.section.account')}
              </Typography>

              <Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleSignOut}
                  sx={{
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    '&:hover': {
                      borderColor: '#b71c1c',
                      backgroundColor: '#ffebee',
                    },
                  }}
                >
                  {t('settings.signOut')}
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default UserSettings;

import { CssBaseline, ThemeProvider, createTheme, CircularProgress, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './services/supabaseClient';
import IndexPage from './pages/Index';
import NotFoundPage from './pages/NotFound';
import LandingPage from './pages/Landing';
import UserSettings from './pages/UserSettings';
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';
import { LocaleProvider } from './i18n/LocaleProvider';

const queryClient = new QueryClient();

// Uber-style theme: Black and White with high contrast
const theme = createTheme({
  palette: {
    primary: { main: "#000000" },
    secondary: { main: "#ffffff" },
    background: { default: "#ffffff", paper: "#f9f9f9" },
    text: { primary: "#000000", secondary: "#666666" },
  },
  typography: {
    fontFamily:
      '"Inter", "Noto Sans TC", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
        },
        contained: {
          backgroundColor: "#000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#333",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
        },
      },
    },
  },
});

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Show loading indicator while checking auth
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocaleProvider>
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
        </LocaleProvider>
      </ThemeProvider>
    );
  }

  // Render landing page when user is signed out
  if (user === null) {
    return (
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocaleProvider>
            <QueryClientProvider client={queryClient}>
              <ToastProvider>
                <LandingPage />
              </ToastProvider>
            </QueryClientProvider>
          </LocaleProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  // Render main app when user is signed in
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocaleProvider>
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/dashboard" element={<IndexPage />} />
                  <Route path="/settings" element={<UserSettings />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </QueryClientProvider>
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

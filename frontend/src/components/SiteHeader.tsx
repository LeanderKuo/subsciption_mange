import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

type NavLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type SiteHeaderProps = {
  navLinks?: NavLink[];
  rightSlot?: ReactNode;
  subtitle?: string;
  variant?: 'dark' | 'light';
};

export const SiteHeader = ({
  navLinks = [],
  rightSlot,
  subtitle,
  variant = 'dark',
}: SiteHeaderProps) => {
  const isDark = variant === 'dark';
  const backgroundColor = isDark ? '#000' : '#fff';
  const borderColor = isDark ? '#1f1f1f' : '#e5e7eb';
  const textColor = isDark ? '#fff' : '#000';

  return (
    <Box
      component="header"
      sx={{
        backgroundColor,
        borderBottom: `1px solid ${borderColor}`,
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
        <Stack
          direction="row"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          spacing={3}
          flexWrap="wrap"
        >
          <Stack spacing={0.5}>
            <Typography
              component="a"
              href="/"
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: textColor,
                textDecoration: 'none',
              }}
            >
              SubMange
            </Typography>
            {subtitle ? (
              <Typography variant="body2" sx={{ color: isDark ? '#fff' : '#4b5563' }}>
                {subtitle}
              </Typography>
            ) : null}
          </Stack>

          <Stack
            component="nav"
            direction="row"
            spacing={2.5}
            alignItems="center"
            sx={{
              flexGrow: 1,
              justifyContent: { xs: 'flex-start', md: 'center' },
              mt: { xs: 2, md: 0 },
            }}
          >
            {navLinks.map((link) => {
              const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
                if (link.onClick) {
                  event.preventDefault();
                  link.onClick();
                }
              };

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={link.onClick ? handleClick : undefined}
                  underline="none"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: textColor,
                    fontWeight: 600,
                    textTransform: 'none',
                    px: 0,
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f3f4f6',
                    },
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ color: textColor, mt: { xs: 2, md: 0 } }}
          >
            {rightSlot}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SiteHeader;

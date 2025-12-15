import {
  Box,
  Container,
  Link,
  Stack,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import { ReactNode, useState } from "react";

type NavLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type SiteHeaderProps = {
  navLinks?: NavLink[];
  rightSlot?: ReactNode;
  /** 行動版快捷按鈕區（語言切換、主題切換等，顯示在 Logo 旁邊） */
  mobileQuickActions?: ReactNode;
  subtitle?: string;
  variant?: "dark" | "light";
  /** 是否顯示返回主頁按鈕（用於Settings等子頁面） */
  showHomeButton?: boolean;
  onHomeClick?: () => void;
};

export const SiteHeader = ({
  navLinks = [],
  rightSlot,
  mobileQuickActions,
  subtitle,
  variant = "dark",
  showHomeButton = false,
  onHomeClick,
}: SiteHeaderProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const isDark = variant === "dark";
  const backgroundColor = isDark ? "#000" : "#fff";
  const borderColor = isDark ? "#1f1f1f" : "#e5e7eb";
  const textColor = isDark ? "#fff" : "#000";

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavLinkClick = (link: NavLink) => {
    if (link.onClick) {
      link.onClick();
    }
    setDrawerOpen(false);
  };

  // 桌機版導覽連結
  const desktopNavLinks = (
    <Stack
      component="nav"
      direction="row"
      spacing={2.5}
      alignItems="center"
      sx={{
        flexGrow: 1,
        justifyContent: { xs: "flex-start", md: "center" },
        mt: { xs: 2, md: 0 },
        display: { xs: "none", md: "flex" },
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
              display: "inline-flex",
              alignItems: "center",
              color: textColor,
              fontWeight: 600,
              textTransform: "none",
              px: 1.5,
              py: 1,
              borderRadius: 1,
              minHeight: 44,
              "&:hover": {
                backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#f3f4f6",
              },
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </Stack>
  );

  // 行動版 Drawer 內容（只放導覽連結，不放快捷操作）
  const mobileDrawerContent = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        backgroundColor,
        color: textColor,
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          SubMange
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: textColor }}
          aria-label="close menu"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* 導覽連結 */}
      {navLinks.length > 0 && (
        <>
          <List sx={{ py: 1 }}>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  component={link.href ? "a" : "button"}
                  href={link.href}
                  onClick={() => handleNavLinkClick(link)}
                  sx={{
                    minHeight: 48,
                    px: 3,
                    "&:hover": {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "#f3f4f6",
                    },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor }} />
        </>
      )}

      {/* 右側功能區（帳號選單等，不是快捷操作） */}
      {rightSlot && (
        <Box sx={{ p: 2 }}>
          <Stack spacing={2} alignItems="stretch">
            {rightSlot}
          </Stack>
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      component="header"
      sx={{
        backgroundColor,
        borderBottom: `1px solid ${borderColor}`,
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 1.5, md: 3 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 1, md: 3 }}
        >
          {/* 左側：返回主頁按鈕（可選） + Logo + 副標題 */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ flexShrink: 0 }}
          >
            {showHomeButton && (
              <IconButton
                onClick={onHomeClick}
                sx={{
                  color: textColor,
                  display: { xs: "flex", md: "flex" },
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "#f3f4f6",
                  },
                }}
                aria-label="返回主頁"
              >
                <HomeIcon />
              </IconButton>
            )}
            <Stack spacing={0.5}>
              <Typography
                component="a"
                href="/"
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: textColor,
                  textDecoration: "none",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                SubMange
              </Typography>
              {subtitle ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? "#fff" : "#4b5563",
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {subtitle}
                </Typography>
              ) : null}
            </Stack>
          </Stack>

          {/* 桌機版導覽 */}
          {desktopNavLinks}

          {/* 桌機版右側功能區 */}
          <Stack
            direction="row"
            spacing={{ xs: 1, md: 2 }}
            alignItems="center"
            sx={{
              color: textColor,
              display: { xs: "none", md: "flex" },
            }}
          >
            {rightSlot}
          </Stack>

          {/* 行動版：快捷操作區 + 漢堡選單 */}
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{
              display: { xs: "flex", md: "none" },
              ml: "auto",
            }}
          >
            {/* 行動版快捷操作（語言切換、主題切換）直接顯示 */}
            {mobileQuickActions}

            {/* 漢堡選單按鈕 */}
            <IconButton
              aria-label="open menu"
              onClick={handleDrawerToggle}
              sx={{
                color: textColor,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>

      {/* 行動版 Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen && isMobile}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // 提升行動端效能
        }}
        PaperProps={{
          sx: {
            backgroundColor,
          },
        }}
      >
        {mobileDrawerContent}
      </Drawer>
    </Box>
  );
};

export default SiteHeader;

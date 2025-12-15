import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Subscription, SubscriptionCategory } from "../types/subscription";
import { useLocale } from "../i18n/LocaleProvider";
import { useTheme } from "../theme/ThemeProvider";
import { CalendarTab } from "./tabs/CalendarTab";
import { MonthlySpendingTab } from "./tabs/MonthlySpendingTab";
import { AnnualEstimateTab } from "./tabs/AnnualEstimateTab";

export type OverviewTab = "calendar" | "monthly" | "annual";

interface DataOverviewDialogProps {
  open: boolean;
  onClose: () => void;
  subscriptions: Subscription[];
  categories: SubscriptionCategory[];
  initialTab?: OverviewTab;
  targetCurrency: string;
  exchangeRates: Record<string, number>;
}

export const DataOverviewDialog = ({
  open,
  onClose,
  subscriptions,
  categories,
  initialTab = "calendar",
  targetCurrency,
  exchangeRates,
}: DataOverviewDialogProps) => {
  const [activeTab, setActiveTab] = useState<OverviewTab>(initialTab);
  const { t } = useLocale();
  const { colors, theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  // Sync with initialTab when it changes
  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
    }
  }, [initialTab, open]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: OverviewTab) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          backgroundColor: colors.surface,
          border: isMobile ? "none" : `1px solid ${colors.border}`,
          maxHeight: isMobile ? "100%" : "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${colors.border}`,
          pb: 2,
        }}
      >
        <Box
          component="span"
          sx={{ fontWeight: 700, fontSize: "1.25rem", color: colors.text }}
        >
          {t("dataOverview.title")}
        </Box>
        <IconButton onClick={onClose} sx={{ color: colors.text }}>
          <Close />
        </IconButton>
      </DialogTitle>

      {/* Tabs - Text Only */}
      <Box sx={{ borderBottom: `1px solid ${colors.border}`, px: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              color: colors.textSecondary,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "0.95rem",
              py: 2,
              "&.Mui-selected": {
                color: colors.primary,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: colors.primary,
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
          }}
        >
          <Tab label={t("dataOverview.tabs.calendar")} value="calendar" />
          <Tab label={t("dataOverview.tabs.monthly")} value="monthly" />
          <Tab label={t("dataOverview.tabs.annual")} value="annual" />
        </Tabs>
      </Box>

      <DialogContent
        sx={{
          p: 3,
          backgroundColor: colors.background,
          overflowY: "auto",
        }}
      >
        {activeTab === "calendar" && (
          <CalendarTab subscriptions={subscriptions} />
        )}
        {activeTab === "monthly" && (
          <MonthlySpendingTab
            subscriptions={subscriptions}
            categories={categories}
            targetCurrency={targetCurrency}
            exchangeRates={exchangeRates}
          />
        )}
        {activeTab === "annual" && (
          <AnnualEstimateTab
            subscriptions={subscriptions}
            categories={categories}
            targetCurrency={targetCurrency}
            exchangeRates={exchangeRates}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DataOverviewDialog;

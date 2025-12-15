import { useMemo } from "react";
import { Box, Stack, Typography, Chip } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  Cell,
} from "recharts";
import { Subscription, SubscriptionCategory } from "../../types/subscription";
import { useLocale } from "../../i18n/LocaleProvider";
import { useTheme } from "../../theme/ThemeProvider";
import { computeMonthlyCost } from "../../utils/billingUtils";
import { format, getMonth, getYear, startOfYear, addMonths } from "date-fns";

interface AnnualEstimateTabProps {
  subscriptions: Subscription[];
  categories: SubscriptionCategory[];
  targetCurrency: string;
  exchangeRates: Record<string, number>;
}

// Helper to get exchange rate
const getRate = (
  currency: string,
  rates: Record<string, number>,
  targetCurrency: string
): number => {
  if (currency === targetCurrency) return 1;
  return rates[currency] ?? 1;
};

export const AnnualEstimateTab = ({
  subscriptions,
  categories,
  targetCurrency,
  exchangeRates,
}: AnnualEstimateTabProps) => {
  const { t } = useLocale();
  const { colors, theme } = useTheme();

  const currentYear = getYear(new Date());
  const lastYear = currentYear - 1;

  // Calculate monthly breakdown for current year with currency conversion
  const monthlyBreakdown = useMemo(() => {
    const today = new Date();
    const months = [];

    for (let i = 0; i < 12; i++) {
      const month = addMonths(startOfYear(today), i);
      const monthLabel = format(month, "MMM");
      const monthNum = getMonth(month);

      // Calculate total for this month
      let thisYearTotal = 0;
      subscriptions.forEach((sub) => {
        const startDate = new Date(sub.startDate);
        const endDate = new Date(sub.endDate);
        const subStartMonth = getMonth(startDate);
        const subStartYear = getYear(startDate);

        // Check if subscription is active in this month
        if (
          (subStartYear < currentYear ||
            (subStartYear === currentYear && subStartMonth <= monthNum)) &&
          (sub.autoRenew || endDate >= month)
        ) {
          const rate = getRate(sub.currency, exchangeRates, targetCurrency);
          thisYearTotal +=
            computeMonthlyCost(sub.price, undefined, undefined, sub.cycle) *
            rate;
        }
      });

      months.push({
        month: monthLabel,
        thisYear: Math.round(thisYearTotal),
        lastYear: null, // No historical data
      });
    }

    return months;
  }, [subscriptions, currentYear, exchangeRates, targetCurrency]);

  // Calculate annual totals with currency conversion
  const annualTotals = useMemo(() => {
    const thisYearTotal = subscriptions.reduce((sum, sub) => {
      const rate = getRate(sub.currency, exchangeRates, targetCurrency);
      return (
        sum +
        computeMonthlyCost(sub.price, undefined, undefined, sub.cycle) *
          12 *
          rate
      );
    }, 0);

    return {
      thisYear: Math.round(thisYearTotal),
      lastYear: null as number | null, // No historical data
      difference: null as number | null,
      percentChange: null as number | null,
    };
  }, [subscriptions, exchangeRates, targetCurrency]);

  // Category breakdown for annual spending with currency conversion
  const categoryBreakdown = useMemo(() => {
    const spending = new Map<number | null, number>();

    subscriptions.forEach((sub) => {
      const rate = getRate(sub.currency, exchangeRates, targetCurrency);
      const annual =
        computeMonthlyCost(sub.price, undefined, undefined, sub.cycle) *
        12 *
        rate;
      const categoryId = sub.categoryId ?? null;
      const existing = spending.get(categoryId) || 0;
      spending.set(categoryId, existing + annual);
    });

    return Array.from(spending.entries())
      .map(([categoryId, amount]) => {
        const category = categories.find((c) => c.id === categoryId);
        return {
          name: category?.name || t("addSubscription.fields.category.none"),
          value: Math.round(amount),
          color: category?.color || "#6b7280",
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [subscriptions, categories, t]);

  return (
    <Box>
      <Stack spacing={4}>
        {/* Annual Summary Cards */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 2, color: colors.text }}
          >
            {t("dataOverview.annual.summary")}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* This Year */}
            <Box
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                backgroundColor: colors.primaryLight,
                border: `1px solid ${colors.primary}40`,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: colors.textSecondary, mb: 1 }}
              >
                {currentYear} {t("dataOverview.annual.thisYear")}
              </Typography>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ color: colors.primary }}
              >
                {targetCurrency} {annualTotals.thisYear.toLocaleString()}
              </Typography>
            </Box>

            {/* Last Year */}
            <Box
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.03)",
                border: `1px solid ${colors.border}`,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: colors.textSecondary, mb: 1 }}
              >
                {lastYear} {t("dataOverview.annual.lastYear")}
              </Typography>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ color: colors.textSecondary }}
              >
                {annualTotals.lastYear !== null
                  ? `${targetCurrency} ${annualTotals.lastYear.toLocaleString()}`
                  : "N/A"}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: colors.textSecondary }}
              >
                {t("dataOverview.annual.noHistoricalData")}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Monthly Breakdown Bar Chart */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 2, color: colors.text }}
          >
            {t("dataOverview.annual.monthlyBreakdown")}
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyBreakdown}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.border}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  stroke={colors.textSecondary}
                  tick={{ fill: colors.textSecondary, fontSize: 12 }}
                />
                <YAxis
                  stroke={colors.textSecondary}
                  tick={{ fill: colors.textSecondary, fontSize: 12 }}
                  tickFormatter={(value) =>
                    value >= 1000 ? `${Math.round(value / 1000)}K` : value
                  }
                />
                <RechartsTooltip
                  formatter={(value: number, name: string) => [
                    `${targetCurrency} ${value.toLocaleString()}`,
                    name === "thisYear"
                      ? t("dataOverview.annual.thisYear")
                      : t("dataOverview.annual.lastYear"),
                  ]}
                  contentStyle={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    color: colors.text,
                  }}
                />
                <Bar
                  dataKey="thisYear"
                  fill={colors.primary}
                  radius={[4, 4, 0, 0]}
                  name={String(currentYear)}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Category Breakdown */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 2, color: colors.text }}
          >
            {t("dataOverview.annual.byCategory")}
          </Typography>
          <Stack spacing={1.5}>
            {categoryBreakdown.map((category, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.03)",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: category.color,
                    }}
                  />
                  <Typography fontWeight={500} sx={{ color: colors.text }}>
                    {category.name}
                  </Typography>
                </Stack>
                <Typography fontWeight={600} sx={{ color: colors.text }}>
                  {targetCurrency} {category.value.toLocaleString()}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default AnnualEstimateTab;

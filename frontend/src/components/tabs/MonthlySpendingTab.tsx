import { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Subscription, SubscriptionCategory } from "../../types/subscription";
import { useLocale } from "../../i18n/LocaleProvider";
import { useTheme } from "../../theme/ThemeProvider";
import { computeMonthlyCost } from "../../utils/billingUtils";
import { addMonths, format } from "date-fns";

interface MonthlySpendingTabProps {
  subscriptions: Subscription[];
  categories: SubscriptionCategory[];
  targetCurrency: string;
  exchangeRates: Record<string, number>;
}

// Color palette for pie chart
const COLORS = [
  "#2196F3",
  "#4CAF50",
  "#FF9800",
  "#E91E63",
  "#9C27B0",
  "#00BCD4",
  "#FF5722",
  "#607D8B",
];

// Helper to get exchange rate
const getRate = (
  currency: string,
  rates: Record<string, number>,
  targetCurrency: string
): number => {
  if (currency === targetCurrency) return 1;
  return rates[currency] ?? 1;
};

export const MonthlySpendingTab = ({
  subscriptions,
  categories,
  targetCurrency,
  exchangeRates,
}: MonthlySpendingTabProps) => {
  const { t } = useLocale();
  const { colors, theme } = useTheme();

  // Calculate spending by category with currency conversion
  const categorySpending = useMemo(() => {
    const spending = new Map<number | null, number>();

    subscriptions.forEach((sub) => {
      const rate = getRate(sub.currency, exchangeRates, targetCurrency);
      const monthly =
        computeMonthlyCost(sub.price, undefined, undefined, sub.cycle) * rate;
      const categoryId = sub.categoryId ?? null;
      const existing = spending.get(categoryId) || 0;
      spending.set(categoryId, existing + monthly);
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
  }, [subscriptions, categories, t, exchangeRates, targetCurrency]);

  // Top subscriptions by monthly cost with currency conversion
  const topSubscriptions = useMemo(() => {
    return [...subscriptions]
      .map((sub) => {
        const rate = getRate(sub.currency, exchangeRates, targetCurrency);
        return {
          ...sub,
          monthlyCost:
            computeMonthlyCost(sub.price, undefined, undefined, sub.cycle) *
            rate,
        };
      })
      .sort((a, b) => b.monthlyCost - a.monthlyCost)
      .slice(0, 5);
  }, [subscriptions, exchangeRates, targetCurrency]);

  // Projected monthly spending (next 12 months) with currency conversion
  const monthlyTrend = useMemo(() => {
    const today = new Date();
    const trend = [];

    for (let i = 0; i < 12; i++) {
      const month = addMonths(today, i);
      const monthLabel = format(month, "MMM");

      // Calculate total for active subscriptions in this month
      let total = 0;
      subscriptions.forEach((sub) => {
        const endDate = new Date(sub.endDate);
        if (endDate >= month || sub.autoRenew) {
          const rate = getRate(sub.currency, exchangeRates, targetCurrency);
          total +=
            computeMonthlyCost(sub.price, undefined, undefined, sub.cycle) *
            rate;
        }
      });

      trend.push({
        month: monthLabel,
        value: Math.round(total),
      });
    }

    return trend;
  }, [subscriptions]);

  const totalMonthly = useMemo(() => {
    return subscriptions.reduce(
      (sum, sub) =>
        sum + computeMonthlyCost(sub.price, undefined, undefined, sub.cycle),
      0
    );
  }, [subscriptions]);

  return (
    <Box>
      <Stack spacing={4}>
        {/* Pie Chart - Spending by Category */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 2, color: colors.text }}
          >
            {t("dataOverview.monthly.byCategory")}
          </Typography>
          {categorySpending.length > 0 ? (
            <Box sx={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySpending}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({
                      cx,
                      cy,
                      midAngle,
                      outerRadius,
                      name,
                      percent,
                    }: {
                      cx?: number;
                      cy?: number;
                      midAngle?: number;
                      outerRadius?: number;
                      name?: string;
                      percent?: number;
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const cxVal = cx ?? 0;
                      const cyVal = cy ?? 0;
                      const angle = midAngle ?? 0;
                      const radiusVal = (outerRadius ?? 100) + 25;
                      const x = cxVal + radiusVal * Math.cos(-angle * RADIAN);
                      const y = cyVal + radiusVal * Math.sin(-angle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill={colors.text}
                          textAnchor={x > cxVal ? "start" : "end"}
                          dominantBaseline="central"
                          fontSize={12}
                        >
                          {`${name ?? ""} ${((percent ?? 0) * 100).toFixed(
                            0
                          )}%`}
                        </text>
                      );
                    }}
                    labelLine={{ stroke: colors.textSecondary }}
                  >
                    {categorySpending.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color || COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value: number) =>
                      `${targetCurrency} ${value.toLocaleString()}`
                    }
                    contentStyle={{
                      backgroundColor: colors.surface,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      color: colors.text,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          ) : (
            <Typography
              sx={{ color: colors.textSecondary, textAlign: "center", py: 4 }}
            >
              {t("index.noSubscriptions")}
            </Typography>
          )}
        </Box>

        {/* Top Subscriptions List */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 2, color: colors.text }}
          >
            {t("dataOverview.monthly.topSubscriptions")}
          </Typography>
          <Stack spacing={1.5}>
            {topSubscriptions.map((sub, index) => (
              <Stack
                key={sub.id}
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
                  <Typography
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: colors.primary,
                      color: theme === "dark" ? "#000" : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography fontWeight={500} sx={{ color: colors.text }}>
                    {sub.name}
                  </Typography>
                </Stack>
                <Typography fontWeight={600} sx={{ color: colors.primary }}>
                  {targetCurrency}{" "}
                  {Math.round(sub.monthlyCost).toLocaleString()} /{" "}
                  {t("index.month")}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Monthly Trend Line Chart */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mb: 2, color: colors.text }}
          >
            {t("dataOverview.monthly.trend")}
          </Typography>
          <Box sx={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
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
                  tickFormatter={(value) => `${Math.round(value / 1000)}K`}
                />
                <RechartsTooltip
                  formatter={(value: number) => [
                    `${targetCurrency} ${value.toLocaleString()}`,
                    t("dataOverview.monthly.projected"),
                  ]}
                  contentStyle={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    color: colors.text,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={colors.primary}
                  strokeWidth={3}
                  dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: colors.primary }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: colors.textSecondary, textAlign: "center", mt: 1 }}
          >
            {t("dataOverview.monthly.projectedNote")}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default MonthlySpendingTab;

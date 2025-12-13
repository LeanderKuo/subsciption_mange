import { useMemo, useState } from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { enUS, es, zhTW } from "date-fns/locale";
import { Subscription } from "../../types/subscription";
import { useLocale } from "../../i18n/LocaleProvider";
import { useTheme } from "../../theme/ThemeProvider";

interface CalendarTabProps {
  subscriptions: Subscription[];
}

const getLocale = (locale: string) => {
  switch (locale) {
    case "zh-TW":
      return zhTW;
    case "es":
      return es;
    default:
      return enUS;
  }
};

export const CalendarTab = ({ subscriptions }: CalendarTabProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { t, locale } = useLocale();
  const { theme, colors } = useTheme();
  const dateLocale = getLocale(locale);

  // Get subscriptions grouped by end date
  const subscriptionsByDate = useMemo(() => {
    const map = new Map<string, Subscription[]>();
    subscriptions.forEach((sub) => {
      const dateKey = format(new Date(sub.endDate), "yyyy-MM-dd");
      const existing = map.get(dateKey) || [];
      map.set(dateKey, [...existing, sub]);
    });
    return map;
  }, [subscriptions]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const weekDays = useMemo(() => {
    const days = [];
    const start = startOfWeek(new Date(), { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(format(day, "EEE", { locale: dateLocale }));
    }
    return days;
  }, [dateLocale]);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const today = new Date();

  return (
    <Box>
      {/* Month Navigation */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <IconButton onClick={handlePrevMonth} sx={{ color: colors.text }}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" fontWeight={700} sx={{ color: colors.text }}>
          {format(currentMonth, "yyyy年 MMMM", { locale: dateLocale })}
        </Typography>
        <IconButton onClick={handleNextMonth} sx={{ color: colors.text }}>
          <ChevronRight />
        </IconButton>
      </Stack>

      {/* Week Days Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1,
          mb: 1,
        }}
      >
        {weekDays.map((day) => (
          <Typography
            key={day}
            variant="body2"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: colors.textSecondary,
              py: 1,
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1,
        }}
      >
        {calendarDays.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const daySubscriptions = subscriptionsByDate.get(dateKey) || [];
          const hasSubscriptions = daySubscriptions.length > 0;
          const isToday = isSameDay(day, today);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <Tooltip
              key={index}
              title={
                hasSubscriptions ? (
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {t("calendar.expiringOn")} {format(day, "MM/dd")}:
                    </Typography>
                    {daySubscriptions.map((sub, i) => (
                      <Typography key={i} variant="body2">
                        • {sub.name}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  ""
                )
              }
              arrow
              disableHoverListener={!hasSubscriptions}
            >
              <Box
                sx={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  cursor: hasSubscriptions ? "pointer" : "default",
                  backgroundColor: hasSubscriptions
                    ? theme === "dark"
                      ? "rgba(255, 152, 0, 0.3)"
                      : "rgba(255, 152, 0, 0.2)"
                    : isToday
                    ? colors.primaryLight
                    : "transparent",
                  border: isToday ? `2px solid ${colors.primary}` : "none",
                  opacity: isCurrentMonth ? 1 : 0.3,
                  transition: "all 0.2s ease",
                  "&:hover": hasSubscriptions
                    ? {
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(255, 152, 0, 0.5)"
                            : "rgba(255, 152, 0, 0.3)",
                      }
                    : {},
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isToday || hasSubscriptions ? 700 : 400,
                    color: hasSubscriptions
                      ? theme === "dark"
                        ? "#ffb74d"
                        : "#e65100"
                      : colors.text,
                  }}
                >
                  {format(day, "d")}
                </Typography>
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      {/* Legend */}
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        sx={{ mt: 3, pt: 2, borderTop: `1px solid ${colors.border}` }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: 1,
              border: `2px solid ${colors.primary}`,
              backgroundColor: colors.primaryLight,
            }}
          />
          <Typography variant="body2" sx={{ color: colors.textSecondary }}>
            {t("calendar.today")}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: 1,
              backgroundColor:
                theme === "dark"
                  ? "rgba(255, 152, 0, 0.3)"
                  : "rgba(255, 152, 0, 0.2)",
            }}
          />
          <Typography variant="body2" sx={{ color: colors.textSecondary }}>
            {t("calendar.hasExpiring")}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CalendarTab;

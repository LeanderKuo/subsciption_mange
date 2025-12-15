import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  isToday,
} from "date-fns";
import { zhTW, es, enUS } from "date-fns/locale";
import { Subscription } from "../types/subscription";
import { useLocale } from "../i18n/LocaleProvider";
import { useTheme } from "../theme/ThemeProvider";

interface SubscriptionCalendarDialogProps {
  open: boolean;
  onClose: () => void;
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

export const SubscriptionCalendarDialog = ({
  open,
  onClose,
  subscriptions,
}: SubscriptionCalendarDialogProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { t, locale } = useLocale();
  const { theme, colors } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
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
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Add padding days for the start of the month
    const startDayOfWeek = getDay(monthStart);
    const paddingDays = Array(startDayOfWeek).fill(null);

    return [...paddingDays, ...days];
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const getSubscriptionsForDay = (day: Date): Subscription[] => {
    const dateKey = format(day, "yyyy-MM-dd");
    return subscriptionsByDate.get(dateKey) || [];
  };

  const weekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(2024, 0, i); // Start from Sunday
      days.push(format(date, "EEE", { locale: dateLocale }));
    }
    return days;
  }, [dateLocale]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          backgroundColor: colors.background,
          border: isMobile ? "none" : `1px solid ${colors.border}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: colors.text,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {t("calendar.title")}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: colors.text }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Month Navigation */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <IconButton onClick={handlePrevMonth} sx={{ color: colors.text }}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h5" fontWeight={700} sx={{ color: colors.text }}>
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
          {weekDays.map((day, index) => (
            <Typography
              key={index}
              variant="body2"
              align="center"
              sx={{
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
            if (!day) {
              return <Box key={`empty-${index}`} />;
            }

            const daySubscriptions = getSubscriptionsForDay(day);
            const hasSubscriptions = daySubscriptions.length > 0;
            const isCurrentDay = isToday(day);
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
                placement="top"
              >
                <Box
                  sx={{
                    aspectRatio: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    cursor: hasSubscriptions ? "pointer" : "default",
                    position: "relative",
                    backgroundColor: isCurrentDay
                      ? colors.primaryLight
                      : hasSubscriptions
                      ? theme === "dark"
                        ? "rgba(255, 152, 0, 0.15)"
                        : "rgba(255, 152, 0, 0.1)"
                      : "transparent",
                    border: isCurrentDay
                      ? `2px solid ${colors.primary}`
                      : hasSubscriptions
                      ? `1px solid ${colors.warning}`
                      : `1px solid ${colors.border}`,
                    transition: "all 0.2s ease",
                    "&:hover": hasSubscriptions
                      ? {
                          backgroundColor:
                            theme === "dark"
                              ? "rgba(255, 152, 0, 0.25)"
                              : "rgba(255, 152, 0, 0.2)",
                          transform: "scale(1.05)",
                        }
                      : {},
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={isCurrentDay || hasSubscriptions ? 700 : 400}
                    sx={{
                      color: isCurrentMonth
                        ? colors.text
                        : colors.textSecondary,
                    }}
                  >
                    {format(day, "d")}
                  </Typography>
                  {hasSubscriptions && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        display: "flex",
                        gap: 0.5,
                      }}
                    >
                      {daySubscriptions.slice(0, 3).map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: colors.warning,
                          }}
                        />
                      ))}
                      {daySubscriptions.length > 3 && (
                        <Typography
                          variant="caption"
                          sx={{ color: colors.warning, fontSize: 10 }}
                        >
                          +{daySubscriptions.length - 3}
                        </Typography>
                      )}
                    </Box>
                  )}
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
                border: `1px solid ${colors.warning}`,
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 152, 0, 0.15)"
                    : "rgba(255, 152, 0, 0.1)",
              }}
            />
            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
              {t("calendar.hasExpiry")}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionCalendarDialog;
